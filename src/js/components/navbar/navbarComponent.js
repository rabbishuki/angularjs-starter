app.component("shNavbar", {
    bindings: {},
    templateUrl: "navbar/navbar.html",
    controller: function ($translate, $state, Configuration) {
        var vm = this;
        
        vm.lang = $state.params.lang;
        vm.scrollTo = scrollTo;
        vm.changeLanguage = changeLanguage;
        
        function changeLanguage(lang) {
            $translate.use(lang);
            vm.lang = lang;
            $state.go(".", { lang: lang });
        }

        function scrollTo(elem) {
            $("html,body").animate({ scrollTop: $('sh-navbar').offset().top });
        }
    }
});


