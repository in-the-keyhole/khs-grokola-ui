define([],
    function(){
        var Singleton = function() { this.searchText = "";
        							 this.referenceId = null;
        							 this.commands = null;
        							 this.solutions = null};

        return new Singleton();
    }
);