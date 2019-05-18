 

 var user = localStorage.getItem('username');        
var pass = localStorage.getItem('password');        

// var wordpress_url = 'http://localhost/wordpress/wp-content/plugins/alln1api/m_api.php';
// var wordpress_product = 'http://localhost/wordpress/wp-content/plugins/alln1api/?api_key=3141f77106d9a241a6ff2db84a44b894';
// var wordpress_order = 'http://localhost/wordpress/wp-json/api/order';

var wordpress_url = 'http://gregoriobalonzo.ml/wordpress/wp-content/plugins/alln1api/m_api.php';
var wordpress_product = 'http://gregoriobalonzo.ml/wordpress/wp-content/plugins/alln1api/?api_key=1e736ca30a127c054ff85169bd8a258e';
var wordpress_order = 'http://gregoriobalonzo.ml/wordpress/wp-content/plugins/alln1api/m_api.php';



 





$(".dropdown-trigger").dropdown();

product_page();


$("#menu a").click(function (e) {
    var page = $(this).attr('page');
    if(page == 'Product'){
        product_page();
    }if(page == 'Sale'){
        $('#page_content_view').load('page/sale.html');
    }if(page == 'Account'){
        account();
    }
    
});






 

function show_error(){
  $('#error').html(`
      <div class="alert alert-danger" role="alert">
          <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">x</span><span class="sr-only">Close</span></button>
          <strong>Error!</strong> wrong username or password
      </div>
      `);
}
function login_btn_disabled(){
    $('#login_btn1').text('Please wait...');
    $('#login_btn1').attr('disabled',true);       
}
function login_btn_back(){
    $('#login_btn1').text('Submit');
    $('#login_btn1').attr('disabled',false);       
}

function login_check(){
    if(localStorage.getItem('username') == 0 ){
        login();
    }else{
        login_user();
    }
}

function login_status(){
    if(localStorage.getItem('username') == 0 ){
        return 0;
    }else{
        return 1;
    }
}

function login_user(){
      var username = localStorage.getItem('username');
      var password = localStorage.getItem('password');
      var login_credentials = $.get(''+wordpress_url+'?username='+username+'&password='+password,function(data){
         if(data == 1){

         }else{
             localStorage.setItem('username',username);              
             localStorage.setItem('password',password);              
             product_page();
         }
      });
}

function product_page(){
        if(login_status(localStorage.getItem('username')) == 0 ){
            login();    
        }else{
        $('#page_title').text('Our Product'); 
        $('#page_desc').text('product description text'); 
        $('#page_content_view').load('page/product.html');
            $.getJSON(wordpress_product, function(json) { 
               var product_length = json.length;
               var product_data = json;
               //console.log("JSON Data: "+json[0].post_title+" "+ json[0].meta_value); 
                for(var a = 0; a <= product_length - 1; a++){
                    var content = `
                        <li class="collection-item avatar">
                         <img src='./img/product_icon.png' class="circle"> 
                          <span class="title">Name: `+json[a].post_title+`</span>
                          <p>Price: `+json[a].meta_value+`<br>
                            Details: `+json[a].post_content+`
                          </p>
                          <a href="#!" onclick="order_product(`+json[a].ID+`)" class="secondary-content"><span class='btn waves-effect waves-light red lighten-2' id="order_`+json[a].ID+`">Order</span></a>
                        </li>
                    `;
                    $('#loop_product').append(content);
                }       
                 
             });    
        }
}

function login_user_now(data){
            if(data == '0'){
                localStorage.setItem('username',username);              
                localStorage.setItem('password',password);              
                product_page();
            }else{
                show_error();
                login_btn_back();
            }            
            login_btn_back();
}

function login_user_form(ee){
login_btn_disabled();
 $.post(wordpress_url, $("#mobile_login_form").serialize(),function(data){
        login_user_now(data);
        login_btn_back();
 })
   .done(function() {
    //alert( "second success" );
  })
  .fail(function() {
    //alert( "error" );
  })
  .always(function() {
    //alert( "finished" );
});
  
}

function login(){
    $('#page_content_view').load('page/login.html');
}
function account(){
    $('#page_content_view').load('page/account.html');
}

function logout(){
    var username = 0;
    var password = 0;
    localStorage.setItem('username',username);  
    localStorage.setItem('password',password);  
    window.location = 'index.html';
}

function order_product(id){
    $.getJSON(wordpress_order+'?id='+id,function(data){
        if(data == 1){
            $('#order_'+id+'').text('Successfully Added');
        }
    });
}

function error(id){
    $('#'+id+'').html(`
        <div class="card-panel red lighten-2 white-text">wrong user or pass</div>
        `);
}