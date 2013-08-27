var MyCtrl = function($scope, $http) {
  $scope.test = function() {
    console.log('clicked');
    
    var result = $http.get('http://localhost:28017/mongo-api/dbs');
    result.success(function(data){
      console.log('hi');
      console.log(JSON.stringify(data));
    });
    
    
  }
}
