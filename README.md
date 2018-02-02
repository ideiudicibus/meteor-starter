Meteor Starter
==============

A Meteor boilerplate with a lot packed in. Originally written in Coffeescript.
This branche has been decaffeinated using:

[Decaffeinate Project](http://decaffeinate-project.org/)

[MIT License](http://choosealicense.com/licenses/mit/)


This 1.5-BRANCH is mantained by i.deiudicibus.


### Setup ####

```
git clone https://github.com/ideiudicibus/meteor-starter.git myapp
cd myapp
git checkout 1.5-BRANCH
meteor
```
#### Admin ####
* Manage everything via an [admin dahsboard]
go to `/admin`

### Docker ###
Dockerize it

for Dev

```
docker build -t myrepo/meteordev -f Dockerfile-dev .
```

Run

```
docker run -it -p 3000:3000 --rm myrepo/meteordev
```


for Prod

```
docker build -t myrepo/mymeteorapp .
```

Run it
```
docker run --name mongodb -d mongo
docker run -it --rm -p 3000:3000 --link mongodb:db -e "MONGO_URL=mongodb://db" -e "ROOT_URL=http://localhost:3000" myrepo/mymeteorapp
```

### what's in this fork ###
Meteor@1.5
solves the 'bson' problem aka : meteor Error: Cannot find module 'bson' 
by using this comment
https://github.com/meteor/meteor/issues/7477#issuecomment-249743787

It uses a working for (perak's) of cfs:gridfs
