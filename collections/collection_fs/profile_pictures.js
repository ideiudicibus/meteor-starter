/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
this.ProfilePictures = new FS.Collection("profilePictures", {
	stores: [
		new FS.Store.FileSystem("images", {

			transformWrite(fileObj, readStream, writeStream){
				if (gm.isAvailable) {
					return gm(readStream, fileObj.name()).autoOrient().stream().pipe(writeStream);
				} else {
					return readStream.pipe(writeStream);
				}
			}
		}),
		new FS.Store.FileSystem("thumbs", {

			transformWrite(fileObj, readStream, writeStream){
				if (gm.isAvailable) {
					const size = {width: 100, height: 100};
					return gm(readStream, fileObj.name()).autoOrient().resize(size.width + "^>", size.height + "^>").gravity("Center").extent(size.width, size.height).stream().pipe(writeStream);
				} else {
					return readStream.pipe(writeStream);
				}
			}
		})
	],
	filter: {
		allow: {
			contentTypes: ['image/*']
		}
	}
}
);