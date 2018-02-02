/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
this.Attachments = new FS.Collection("Attachments", {
	stores: [
		new FS.Store.GridFS("attachments", {

			transformWrite(fileObj, readStream, writeStream){
				if (gm.isAvailable) {
					if (fileObj.original.type.substr(0,5) === 'image') {
					  return gm(readStream, fileObj.name()).autoOrient().stream().pipe(writeStream);
					} else {
					  return readStream.pipe(writeStream);
				}
				} else {
					return readStream.pipe(writeStream);
				}
			}
		})
	]
}
);