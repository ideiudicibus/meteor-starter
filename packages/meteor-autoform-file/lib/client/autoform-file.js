/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
AutoForm.addInputType('fileUpload', {
  template: 'afFileUpload',
  valueOut() {
    return this.val();
  }
}
);

const getCollection = function(context) {
  if (typeof context.atts.collection === 'string') {
    return FS._collections[context.atts.collection] || window[context.atts.collection];
  }
};

const getDocument = function(context) {
  const collection = getCollection(context);
  const id = __guardMethod__(__guard__(Template.instance(), x => x.value), 'get', o => o.get());
  return (collection != null ? collection.findOne(id) : undefined);
};

Template.afFileUpload.onCreated(function() {
  const self = this;
  this.value = new ReactiveVar(this.data.value);

  this._stopInterceptValue = false;
  this._interceptValue = ctx => {
    if (!this._stopInterceptValue) {
      const t = Template.instance();
      if ((t.value.get() !== false) && (t.value.get() !== ctx.value) && ((ctx.value != null ? ctx.value.length : undefined) > 0)) {
        t.value.set(ctx.value);
        return this._stopInterceptValue = true;
      }
    }
  };

  this._insert = function(file) {
    const collection = getCollection(self.data);

    if (Meteor.userId) {
      file.owner = Meteor.userId();
    }

    if (typeof (self.data.atts != null ? self.data.atts.onBeforeInsert : undefined) === 'function') {
      file = (self.data.atts.onBeforeInsert(file)) || file;
    }

    return collection.insert(file, function(err, fileObj) {
      if (typeof (self.data.atts != null ? self.data.atts.onAfterInsert : undefined) === 'function') {
        self.data.atts.onAfterInsert(err, fileObj);
      }

      fileObj.update({$set: {metadata: {owner: Meteor.userId()}}});

      if (err) { return console.log(err); }
      return self.value.set(fileObj._id);
    });
  };

this._remove = function(fileId){
  const collection = getCollection(self.data);
  let file=collection.findOne(fileId);

  Meteor.call('removeFromCollection',file,(error,response)=>{

    console.log(error,response);
  })
};

  return this.autorun(function() {
    const _id = self.value.get();
    return _id && Meteor.subscribe('autoformFileDoc', self.data.atts.collection, _id);
  });
});

Template.afFileUpload.onRendered(function() {
  const self = this;
  return $(self.firstNode).closest('form').on('reset', () => self.value.set(false));
});

Template.afFileUpload.helpers({
  label() {
    return this.atts.label || 'Choose file';
  },
  removeLabel() {
    return this.atts.removeLabel || 'Remove';
  },
  value() {
    const doc = getDocument(this);
    return (doc != null ? doc.isUploaded() : undefined) && doc._id;
  },
  schemaKey() {
    return this.atts['data-schema-key'];
  },
  previewTemplate() {
    return (this.atts != null ? this.atts.previewTemplate : undefined) || (__guard__(getDocument(this), x => x.isImage()) ? 'afFileUploadThumbImg' : 'afFileUploadThumbIcon');
  },
  previewTemplateData() {
    return {
      file: getDocument(this),
      atts: this.atts
    };
  },
  file() {
    Template.instance()._interceptValue(this);
    return getDocument(this);
  },
  removeFileBtnTemplate() {
    return (this.atts != null ? this.atts.removeFileBtnTemplate : undefined) || 'afFileRemoveFileBtnTemplate';
  },
  selectFileBtnTemplate() {
    return (this.atts != null ? this.atts.selectFileBtnTemplate : undefined) || 'afFileSelectFileBtnTemplate';
  },
  selectFileBtnData() {
    return {
      label: this.atts.label || 'Choose file',
      accepts: this.atts.accepts
    };
  },
  uploadProgressTemplate() {
    return (this.atts != null ? this.atts.uploadProgressTemplate : undefined) || 'afFileUploadProgress';
  }
});

Template.afFileUpload.events({
  "dragover .js-af-select-file"(e) {
    e.stopPropagation();
    return e.preventDefault();
  },

  "dragenter .js-af-select-file"(e) {
    e.stopPropagation();
    return e.preventDefault();
  },

  "drop .js-af-select-file"(e, t) {
    e.stopPropagation();
    e.preventDefault();
    return t._insert(new FS.File(e.originalEvent.dataTransfer.files[0]));
  },

  'click .js-af-remove-file'(e, t,data) {
    e.preventDefault();
    var fileId=(t.value).get();
  
    var retValue= t._remove(fileId);
    if(retValue){ t.value.set(false);}
    
  },

  'fileuploadchange .js-file'(e, t, data) {
    return t._insert(new FS.File(data.files[0]));
  }});

Template.afFileUploadThumbImg.helpers({
  url() {
    return this.file.url({store: this.atts.store});
  }
});

Template.afFileUploadThumbIcon.helpers({
  url() {
    return this.file.url({store: this.atts.store});
  },
  icon() {
    switch (this.file.extension()) {
      case 'pdf':
        return 'file-pdf-o';
      case 'doc': case 'docx':
        return 'file-word-o';
      case 'ppt': case 'avi': case 'mov': case 'mp4':
        return 'file-powerpoint-o';
      default:
        return 'file-o';
    }
  }
});

Template.afFileSelectFileBtnTemplate.onRendered(function() {
  return this.$('.js-file').fileupload();
});

function __guardMethod__(obj, methodName, transform) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
    return transform(obj, methodName);
  } else {
    return undefined;
  }
}
function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}