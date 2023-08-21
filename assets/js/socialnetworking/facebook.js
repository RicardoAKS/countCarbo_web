// /**
//  *
//  * Script de perfil
//  *
//  * @author Emprezaz
//  *
//  **/
//  (function($, PATH, Helpers) {

//     const facebook = function(){
//         window.fbAsyncInit = function() {
//             FB.init({
//               appId      : '678899813100497',
//               cookie     : true,
//               xfbml      : true,
//               version    : 'v12.0'
//             });
              
//             FB.AppEvents.logPageView();   
              
//         };
        
//         (function(d, s, id){
//             var js, fjs = d.getElementsByTagName(s)[0];
//             if (d.getElementById(id)) {return;}
//             js = d.createElement(s); js.id = id;
//             js.src = "https://connect.facebook.net/en_US/sdk.js";
//             fjs.parentNode.insertBefore(js, fjs);
//         }(document, 'script', 'facebook-jssdk'));

//     }

//     $(document).ready(function(){
//         facebook();
//     })

//  })($, PATH, Helpers);

// const invokeCSCode = function(data) {
//     try {
//         invokeCSharpAction(data);
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

// //para carregar a função do login no facebook
// function checkLoginState() {
//     FB.getLoginStatus(function(response) {
		
// 		if(response.status == 'connected'){
// 			FB.api("/me", {fields: 'email, name'}, function(res){
// 				$.ajax({
// 					url: PATH + '/checkUsername',
// 					dataType: 'json',
// 					type: 'POST',
// 					async: false,
// 					data: {
// 						login: res.email,
// 					},
// 					complete: function(response) {
						
// 						if(response.responseJSON.result){
//                             $.ajax({
//                                 url: PATH + '/loginWithFacebook',
//                                 dataType: 'json',
//                                 type: 'POST',
//                                 async: false,
//                                 data: {
//                                     email: res.email,
//                                     facebook: true
//                                 },
//                                 complete: function(result){
									
//                                     if(result.responseJSON.response){
//                                         invokeCSCode(result.responseJSON.user['id'] + "|" + result.responseJSON.user['email'] + "|" + result.responseJSON.user['password'] + "|" + result.responseJSON.user['phone']);
//                                         window.location.href = PATH + "/search/page";
//                                     }
//                                 }
//                             });
// 						}else{
// 							$.ajax({
//                                 url: PATH + '/cadastreWithFacebook',
//                                 dataType: 'json',
//                                 type: 'POST',
//                                 async: false,
//                                 data: {
//                                     email: res.email,
//                                     name: res.name,
//                                     facebook: true
//                                 },
//                                 complete: function(result){

//                                     if(result.responseJSON.result){

//                                         window.location.href = PATH + "/password/account/" + result.responseJSON.result;

//                                     }

//                                 }
//                             });
// 						}
// 					}
// 				});
				
// 			});
// 		}
//     });
// }