import cheerio from 'cheerio';
import accounting from 'accounting';




Meteor.methods({
	'importPlayerStats': function (playerStats) {
		var tmPlayerId = playerStats.tmPlayerId;
		var player = Players.findOne({ transferMarktPlayerId: (tmPlayerId).toString() });
		if (!player) {
			throw new Meteor.Error(503, 'player not found tm id: ' + tmPlayerId, null);
		}

		var results = [];
		if (player) {
			_.each(playerStats.tmPlayerStatsList, function (item) {

              
				if (_.isObject(item) ) {
					try {
						//clone the form object then delete the object
						var t = _.clone(item);
						t.player = player._id;
						delete t['tmPlayerId'];
						//insert a stat if not duplicated 
						var stat = PlayerStats.findOne({ competition: t.competition, season: t.season, player: t.player });

						if (stat == undefined || stat == null) {
							//insert a new club if club's name not found
							var club = Clubs.findOne({ name: t.club });
							if (club) { 
								
								t.club = club._id; 
							
							}
							else { 
								
								t.club=Clubs.insert({ name: t.club });
								  	 
							}

							//insert a new stat if it adheres to the schema

							var objId = PlayerStats.insert(t);
							results.push(objId);
						}

					}
					catch (error) {


						console.log(error);
						throw new Meteor.Error(503,' cannot insert statistic ' + JSON.stringify(item), null);
					}
				}


			})

		}
		return _.size(results);
	},

	'importTransferHistory': function (transferHistory) {
		var tmPlayerId = transferHistory.tmPlayerId;
		var player = Players.findOne({ transferMarktPlayerId: (tmPlayerId).toString() });
		if (!player) {
			throw new Meteor.Error(503, 'player not found tm id: ' + tmPlayerId, null);
		}
		var results = [];
		if (player) {
			_.each(transferHistory.transferHistoryList, function (item) {
				try {
					var t = {};
					t.player = player._id;
					t.season = item.season;
					t.date = item.transferDate;
					var buyerClub = Clubs.findOne({ name: item.movingFrom });

					if (buyerClub) { t.buyer_club = buyerClub._id; }
					else { Clubs.insert({ name: item.movingFrom }) }

					var sellerClub = Clubs.findOne({ name: item.movingTo });

					if (sellerClub) { t.seller_club = sellerClub._id; }
					else { Clubs.insert({ name: item.movingTo }) }

					t.market_value = item.marketValue;
					t.fee = item.transferFee;
					var objId = Transfers.insert(t);
					results.push(objId);

				}
				catch (error) {
					
					throw new Meteor.Error(503, 'cannot insert transfer ' + JSON.stringify(item), error);
				}

			})

		}
		return _.size(results);
	}

	,
	'importPlayerProfile': function (tmPlayer) {

		var result = Players.findOne({ transferMarktPlayerId: tmPlayer.transferMarktPlayerId });

		if (result) {
			throw new Meteor.Error(503, 'duplicate player ,please use the update', null);
		}

		try {
			var playerId = Players.insert(tmPlayer);
			return playerId;
		}
		catch (error) {

			throw new Meteor.Error(500, 'importPlayerProfile cannot insert', error);
		}


	},
	//todo
	'updateImportedPlayerProfile': function (tmPlayer) {
		var result = Players.findOne({ transferMarktPlayerId: tmPlayer.transferMarktPlayerId });
		try {
			Players.update(result._id, tmPlayer);

		}
		catch (error) {
			throw new Meteor.Error(500, 'importPlayerProfile cannot update', error);
		}

	},
	'scrapePlayerProfileFromTranferMarkt': function (playerId) {

		var url = 'http://www.transfermarkt.com/mile-jedinak/profil/spieler/';
		var result = Meteor.http.get(url + playerId, {
			headers: { 'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.2) Gecko Fedora/1.9.0.2-1.fc9' }
		});

		var $ = cheerio.load(result.content);
		var profileMetadata = {};

		var profileTable = $('.auflistung');
		var profileTableRows = $(profileTable).find('tr');

		var children = $(profileTableRows).find('td');

		profileMetadata['fullName'] = $(children[0]).text().trim().replace(/[\n\t\r]/g, "");
		var extractedDate = $(children[1]).text().trim().replace(/[\n\t\r]/g, "");
		extractedDate = Utils.parseTmDateA(extractedDate);
		//extractedDate=Utils.prettyDate(extractedDate);

		profileMetadata['birthDate'] = extractedDate;

		profileMetadata['birthPlace'] = $(children[2]).text().trim().replace(/[\n\t\r]/g, "");
		profileMetadata['age'] = $(children[3]).text().trim().replace(/[\n\t\r]/g, "");
		profileMetadata['height'] = $(children[4]).text().trim().replace(/[\n\t\r]/g, "");
		profileMetadata['nationality'] = $(children[5]).text().trim().replace(/[\n\t\r]/g, "");
		profileMetadata['position'] = $(children[6]).text().trim().replace(/[\n\t\r]/g, "");
		profileMetadata['foot'] = $(children[7]).text().trim().replace(/[\n\t\r]/g, "");


		profileMetadata['currentAgent'] = $(children[8]).text().trim().replace(/[\n\t\r]/g, "");
		profileMetadata['currentClub'] = $(children[9]).text().trim().replace(/[\n\t\r]/g, "");

		/*extractedDate = $(children[10]).text().trim().replace(/[\n\t\r]/g, "");
		
		extractedDate = Utils.parseTmDateA(extractedDate);
		//extractedDate=Utils.prettyDate(extractedDate);
		profileMetadata['currentContractFrom'] = extractedDate;


		extractedDate = $(children[11]).text().trim().replace(/[\n\t\r]/g, "");
		extractedDate = Utils.parseTmDateB(extractedDate);

		//extractedDate=Utils.prettyDate(extractedDate);

		profileMetadata['currentContractTo'] = extractedDate;
		*/
		profileMetadata['transferMarktPlayerId'] = playerId;

		Match.test(profileMetadata, Schemas.PlayerProfile);

		var transferHistoryArray = [];

		var transferHistoryTbody = $('tr.zeile-transfer').parent();

		var transferHistoryRows = $(transferHistoryTbody).find('tr.zeile-transfer');

		transferHistoryRows.each(function (i, element) {

			var tds = $('td', element);

			var season = $(tds[0]).text().trim().replace(/[\n\t\r]/g, "");
			var transferDate = $(tds[1]).text().trim().replace(/[\n\t\r]/g, "");
			var movingFrom = $(tds[5]).text().trim().replace(/[\n\t\r]/g, "");
			var movingTo = $(tds[9]).text().trim().replace(/[\n\t\r]/g, "");

			var marketValue = $(tds[10]).text().trim().replace(/[\n\t\r]/g, "");

			if (marketValue.indexOf('Mill') > 0) {
				marketValue = marketValue.replace(/[^0-9\,]+/g, "");
				marketValue += '0000';
				marketValue = accounting.unformat(marketValue);
			}
			else {
				if (marketValue.indexOf('Th')) {
					marketValue = marketValue.replace(/[^0-9\,]+/g, "");
					marketValue += '000';
					marketValue = accounting.unformat(marketValue);
				}
			}


			var transferFee = $(tds[11]).text().trim().replace(/[\n\t\r]/g, "");

			if (transferFee.indexOf('Mill') > 0) {
				transferFee = transferFee.replace(/[^0-9\,]+/g, "");
				transferFee += '0000';

				transferFee = accounting.unformat(transferFee);

			}
			else {
				if (transferFee.indexOf('Th')) {
					transferFee = transferFee.replace(/[^0-9\,]+/g, "");
					transferFee += '000';

					transferFee = accounting.unformat(transferFee);

				}
			}



			transferDate = Utils.parseTmDateA(transferDate);
			//transferDate=Utils.prettyDate(transferDate);
			//transferDate=Utils.prettyDate(transferDate);

			var tranferItem = {};
			tranferItem['season'] = season;
			tranferItem['transferDate'] = transferDate;
			tranferItem['movingFrom'] = movingFrom;
			tranferItem['movingTo'] = movingTo;
			tranferItem['marketValue'] = marketValue;
			tranferItem['transferFee'] = transferFee;

			transferHistoryArray.push(tranferItem);

		});
		/*
		var totalMarketValue =_.chain(transferHistoryArray).map(function(a){
			   return (a.marketValue);
		}).reduce(function(memo,n){return memo+n}).value();
		  var totalTranferFeeValue =_.chain(transferHistoryArray).map(function(a){
			   return (a.transferFee);
		}).reduce(function(memo,n){return memo+n}).value()
		*/
		var retObject = {};
		retObject.profileMetadata = profileMetadata;
		retObject.transferHistory = { tmPlayerId: playerId, transferHistoryList: transferHistoryArray };
		
		
		return retObject;
	},


	'scrapePlayerStatsFromTranferMarkt': function (playerId) {
		var url = 'http://www.transfermarkt.com/mile-jedinak/leistungsdatendetails/spieler/';
		var result = Meteor.http.get(url + playerId, {
			headers: {

				'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.2) Gecko Fedora/1.9.0.2-1.fc9' // optional headers
			}
		});

		var $ = cheerio.load(result.content);

        
		var statsHistoryArray = [];
		var profileStatsHistory = {};

		var statsHistoryTableRows = $('table.items').find('tr')
		
		statsHistoryTableRows.each(function (i, element) {
			var tds = $('td', element);

			var season = $(tds[0]).text().trim().replace(/[\n\t\r]/g, "");
			var competition = $(tds[2]).text().trim().replace(/[\n\t\r]/g, "");
			var club = $(tds[3]).find('a').children("img").attr("alt");
			var matches = $(tds[4]).text().trim().replace(/[\n\t\r]/g, "");
			var points_per_match = $(tds[5]).text().trim().replace(/[\n\t\r]/g, "");
			var goals = $(tds[6]).text().trim().replace(/[\n\t\r]/g, "");
			var assists = $(tds[7]).text().trim().replace(/[\n\t\r]/g, "");
			var referee_cards = $(tds[8]).text().trim().replace(/[\n\t\r]/g, "");
			var referee_cardsArray = referee_cards.split('/');
			referee_cards = {};
			referee_cards.yellow = referee_cardsArray[0];
			referee_cards.yellow_red = referee_cardsArray[1];
			referee_cards.red = referee_cardsArray[1];
			var played_minutes = $(tds[9]).text().trim().replace(/[\n\t\r]/g, "");

			var statsItem = {};
			
			statsItem['season'] =season;
			statsItem['competition'] = competition;
			statsItem['club'] = club;
			statsItem['matches'] = matches;
			statsItem['points_per_match'] = (points_per_match != null ? points_per_match.replace(",", ".") : "");
			statsItem['goals'] = goals;
			statsItem['assists'] = assists;
			//statsItem['referee_cards']=referee_cards;
			statsItem['played_minutes'] = (played_minutes != null ? played_minutes.replace("\'", "").replace(".", "") : "");
            statsHistoryArray.push(statsItem);
             


		});
		profileStatsHistory['tmPlayerId'] = playerId;
		profileStatsHistory['tmPlayerStatsList'] = statsHistoryArray;
		return profileStatsHistory;



	}
});


