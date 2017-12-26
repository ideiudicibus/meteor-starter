Template.playagentDashboardSidebar.helpers({

    activePath(menuItem) {
     let currentRouterName=Router.current().route.getName();
     if(menuItem===currentRouterName) return Spacebars.SafeString('active');
     return  Spacebars.SafeString('');;
    }
})