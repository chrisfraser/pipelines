var Pipelines = function($scope, $http) {
  var internals = {
    $container: $('div#pipes'),
    pipeWidth: 150,
    stages: [],
    customers: []
  };
  
  var fn = {
    pushCustomers: function(pipe, stage) {
      $.each(internals.customers, function(idx, customer){
        var pipeContainer = internals.stages[idx];
        
        if(stage.id === 0) {
          var customerDiv = $('<div />')
            .addClass('customer customerTitle')
            .text(customer.name);
        } else {
          var customerDiv = $('<div />')
            .addClass('customer')
            .text(' ');
        }
        
        pipe.append(customerDiv);
      });
    }
  };
  
  $scope.test = function() {
    var result = $http.get('json/001/init.json');
    result.success(function(data){
      internals.customers = data.sources;
      
      // Show and stretch pipeline area...
      internals.$container.css({
        'width': (data.stages.length * internals.pipeWidth) + 'px',
        'display': 'block'
      });
      
      // pop in our pipes
      var pipeId = 0;
      $.each(data.stages, function(idx, stage){
        var pipe = $('<div />')
          .addClass('pipeBlock');
        
        
          var headder = $('<div />')
            .addClass('headder')
            .addClass(stage.id === 0 ? 'spacer' : '')
            .html(stage.id === 0 ? '&nbsp;' : stage.displayName);
          pipe.append(headder);
        
        
        internals.$container.append(pipe);
        
        internals.stages.push({
          $pipe: pipe,
          $head: headder,
          stage: stage
        });
        
        fn.pushCustomers(pipe, stage);
      });
      
      
    });
    
    
  }
}
