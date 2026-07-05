// Google Reader Revenue Manager - yaar-win7.online
// Publication ID: CAowrPXgCw

(function() {
  // Load SWG Basic script
  var swgScript = document.createElement('script');
  swgScript.async = true;
  swgScript.type = 'application/javascript';
  swgScript.src = 'https://news.google.com/swg/js/v1/swg-basic.js';
  document.head.appendChild(swgScript);
  
  // Initialize Reader Revenue Manager
  (self.SWG_BASIC = self.SWG_BASIC || []).push(function(basicSubscriptions) {
    basicSubscriptions.init({
      type: "NewsArticle",
      isPartOfType: ["Product"],
      isPartOfProductId: "CAowrPXgCw:openaccess",
      clientOptions: { 
        theme: "light", 
        lang: "en" 
      }
    });
  });
})();