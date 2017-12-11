/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Template.navbar.events({
  'change #sliding-menu-controller'(e) {
    return $('body')[ e.currentTarget.checked ? 'addClass' : 'removeClass' ]('no-overflow');
  },

  'click .sliding-menu a'() {
    return $('#sliding-menu-controller').prop('checked', false);
  }
});
