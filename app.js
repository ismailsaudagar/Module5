
angular.module("module5",["ui.router"])
.config(RoutesConfig,"RoutesConfig")
.controller("UserRegistrationController", UserRegistrationController);

RoutesConfig.$inject =["$stateProvider","$urlRouterProvider"];

function RoutesConfig($stateProvider,$urlRouterProvider)
{

    //$urlRouterProvider.otherwise("/Home");

    //Registering Routes
    $stateProvider.state("Home",
        {
           
            url:"/Home",
            templateUrl:"./Index.html"
        })
        .state("SignUp",
            {
                url:"/SignUp",
                template:

"<form name='signUpForm' novalidate>"+
   " <table>"+
      " <body>"+
       " <tr>"+
            "<td>First Name</td>"+
           '<td><input type="text" required ng-minlength="4" name="FirstName" ng-model="urc.user.FirstName"/>&nbsp;'+
               ' <span class="error"  ng-if="signUpForm.FirstName.$error.required && signUpForm.FirstName.$touched">First Name is required</span></td>'+
               ' <span class="error"  ng-if="signUpForm.FirstName.$error.minlength && signUpForm.FirstName.$touched">First Name should be of min of 4 letters</span></td>'+

            '</tr>'+
            '<tr>'+
            '<td>Last Name</td>'+
            '<td><input type="text" required name="LastName" ng-model="urc.user.LastName"/>&nbsp;'+
                '<span class="error" ng-if="signUpForm.LastName.$error.required && signUpForm.LastName.$touched">Last Name is required</span></td>'+
       ' </tr>'+
        '<tr>'+
            '<td>Email</td>'+
            '<td><input type="email" name="Email"  required ng-model="urc.user.Email"/>&nbsp;'+
                '<span class="error" ng-if="signUpForm.Email.$error.required && signUpForm.Email.$touched">Email is required</span>'+
                '<span class="error" ng-if="signUpForm.Email.$error.email && signUpForm.Email.$touched">Please enter valid email</span>'+

           '</td>'+
        '</tr>'+
        '<tr>'+
           ' <td>Phone Number</td>'+
           ' <td><input type="number" name="PhoneNumber" required ng-minlength="10" ng-maxlength="10"  ng-model="urc.user.PhoneNumber"/>&nbsp;'+
                '<span class="error" ng-if="signUpForm.PhoneNumber.$error.required && signUpForm.PhoneNumber.$touched">Phone Number is required</span>'+
                '<span class="error" ng-if="signUpForm.PhoneNumber.$error.minlength && signUpForm.PhoneNumber.$touched">Phone Number should be of min 10 digits</span>'+
                '<span class="error" ng-if="signUpForm.PhoneNumber.$error.maxlength && signUpForm.PhoneNumber.$touched">Phone Number should be of max 10 digits</span>'+

            '</td>'+
        '</tr>'+
        '<tr><td>Menu Number</td><td><input type="text" name ="MenuNumber" ng-model="urc.user.MenuNumber"/></td></tr>'+
        '<tr></tr><tr></tr>'+
        '<tr><td></td><td><button  ng-disabled ="signUpForm.$invalid" ng-click="urc.Signup();" >Submit</button></td></tr>'+
        '<tr></tr>'+
        '<tr ng-show = "urc.savedfalg" ng-model="urc.savedflag"><td>Your information has been saved</td></tr>'+
       '</body>'+
    '</table>'+
    '</form>'
    



            }
        )
        .state("MyInfo",
            {
                url:"/MyInfo",
                template:
                '<div ng-if="urc.RegisteredUser.length>0">'+
    '<div  style="float:left;">'+
        '<h1>Welcome to My Info. Following is your detail</h1>'+
        '<table>'+
            '<tr>'+
                '<td>Name</td><td>{{urc.RegisteredUser[0].FirstName +" " +urc.RegisteredUser[0].LastName}}</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Email</td><td>{{urc.RegisteredUser[0].Email}}</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Phone Number</td><td>{{urc.RegisteredUser[0].PhoneNumber}}</td>'+
            '</tr>'+
                   
    
    '</div>'+
   
    '<div id="dishdetails" style="float:left;">'+
   
   
'<table>'+
'<tr><td colspan="3"><h1>Selected menu item details are given below:</h1></td></tr>'+
    '<tr><td colspan="2"><img src="{{urc.returnedMenuItem[0].image_src}}"/></td></tr>'+
    '<tr><td>Name:{{urc.returnedMenuItem[0].name}}</td></tr>'+
    '<tr><td>Description: {{urc.returnedMenuItem[0].description}}</td></tr>'+
    '<tr><td>ShortName:{{urc.returnedMenuItem[0].short_name}}</td></tr>'+
'</table>'+
    '</div>'+
'</div>'+
'<div ng-if="urc.RegisteredUser.length == 0"> Not Signed Up Yet. <a ui-sref="SignUp">Sign up Now!</a></div>'


            }
        );
}


UserRegistrationController.$inject = ["$http"];

function UserRegistrationController($http)
{
   

    var urc = this;
    baseurl ="https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/";
    urc.ModuleName = "module 5";
    urc.RegisteredUser = [];
    urc.returnedMenuItem =[];
    urc.savedflag = false;


    //method for registration 

    urc.Signup = function()
    {
        
    
     urc.RegisteredUser.push(urc.user);
     alert("you have been signed up successfully");
     
     urc.savedflag = true;
     
     var  finalurl1 = baseurl+((parseInt(urc.user.MenuNumber))-1)+".json";
    
     //ServiceCall(finalurl1)

     $http({
       
        method:"GET",
        url:finalurl1
        
       
    }).then(function Success(response)
{

   if(response.data)
   {
    var obj = response.data;
    obj.image_src="./Images/beefsauteed.jpg";
    urc.returnedMenuItem.push(obj);
    urc.savedflag=true;
   }
   else{
    alert("No such menu number exists");
   }
},function Error(error)

{
    //alert(JSON.stringify(error))

});

    }


    function ServiceCall(finalurl1)
    {
     
       
    }




}
