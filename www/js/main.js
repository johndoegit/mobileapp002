
var login = localStorage.getItem('login');

//
// var wordpress_url = 'http://localhost/wordpress/wp-content/plugins/alln1api/m_api.php';
// var wordpress_product = 'http://localhost/wordpress/wp-content/plugins/alln1api/?api_key=b4bc347010d2fc2e6162df18b75bb6bd';
// var wordpress_order = 'http://localhost/wordpress/wp-json/api/order';
// var current_user = 'http://localhost/wordpress/wp-content/plugins/alln1api/m_api.php?currentuser';
// var userData = 'http://localhost/wordpress/wp-content/plugins/alln1api/m_api.php?user';
// var order = 'http://localhost/wordpress/wp-content/plugins/alln1api/m_api.php?orders';
// var currency_link = 'http://localhost/wordpress/wp-content/plugins/alln1api/m_api.php?currencysymbol';
// var product_image = 'http://localhost/wordpress/wp-content/plugins/alln1api/m_api.php?productimage';

var wordpress_url = 'http://gregoriobalonzo.ml/wordpress/wp-content/plugins/alln1api/m_api.php';
var wordpress_product = 'http://gregoriobalonzo.ml/wordpress/wp-content/plugins/alln1api/?api_key=1e736ca30a127c054ff85169bd8a258e';
var wordpress_order = 'http://gregoriobalonzo.ml/wordpress/wp-json/api/order';
var current_user = 'http://gregoriobalonzo.ml/wordpress/wp-content/plugins/alln1api/m_api.php?currentuser';
var userData = 'http://gregoriobalonzo.ml/wordpress/wp-content/plugins/alln1api/m_api.php?user';
var order = 'http://gregoriobalonzo.ml/wordpress/wp-content/plugins/alln1api/m_api.php?orders';
var currency_link = 'http://gregoriobalonzo.ml/wordpress/wp-content/plugins/alln1api/m_api.php?currencysymbol';
var product_image = 'http://gregoriobalonzo.ml/wordpress/wp-content/plugins/alln1api/m_api.php?productimage';







$(".dropdown-trigger").dropdown();

product_page();
refresh();
getCurrency();

$("#menu a").click(function (e) {
    var page = $(this).attr('page');
    if(page == 'Product'){
        product_page();
        menu_hide();
    }
    if(page == 'Sale'){
        $('#page_content_view').load('page/sale.html');
        menu_hide();
    }
    if(page == 'Account'){
        account();
        menu_hide();
    }
    if(page == 'Orders'){
        order_page();
        menu_hide();
    }
});

function get_image()
{

}

function getCurrency()
{

    $.get(currency_link,function(data){
        localStorage.setItem('currency',data)
    })
}

function order_page()
{
    $('#page_title').text('MY ORDER');
    $('#page_desc').text('');
    $('#page_content_view').load('page/order.html');
}

function get_order()
{
    var user_id = localStorage.getItem('userid')
    $.get(order+'='+user_id,function(data){
        console.log(data);
    })
}

function refresh()
{
    var login_check = localStorage.getItem('userid');
    if(login_check == 0){
        hide_btn();
    }else{
        show_btn();
    }
}

function show_btn()
{
    $("#prod_btn").css('display','block');
    $("#acnt_edit_btn").css('display','block');
    $("#logout_btn").css('display','block');
    $("#orders_btn").css('display','block');
}

function hide_btn()
{
    $("#prod_btn").css('display','none');
    $("#acnt_edit_btn").css('display','none');
    $("#logout_btn").css('display','none');
    $("#orders_btn").css('display','none');
}

function currentuser()
{
    $.get(current_user,function(data){
        localStorage.setItem('userid',data);
    });
}

function getUserData()
{
    var userId = localStorage.getItem('userid');
    $.get(userData+'='+userId,function(data){
        var data = JSON.parse(data);
        console.log(data);
        localStorage.setItem('nickname',data.nickname);
        localStorage.setItem('firstname',data.first_name);
        localStorage.setItem('lastname',data.last_name);
        //billing
        localStorage.setItem('billing_address_1',data.billing_address_1);
        localStorage.setItem('billing_address_2',data.billing_address_2);
        localStorage.setItem('billing_city',data.billing_city);
        localStorage.setItem('billing_company',data.billing_company);
        localStorage.setItem('billing_country',data.billing_country);
        localStorage.setItem('billing_email',data.billing_email);
        localStorage.setItem('billing_first_name',data.billing_first_name);
        localStorage.setItem('billing_last_name',data.billing_last_name);
        localStorage.setItem('billing_phone',data.billing_phone);
        localStorage.setItem('billing_postcode',data.billing_postcode);
        localStorage.setItem('billing_state',data.billing_state);
        $('#user_fname').val(localStorage.getItem('firstname'));
        $('#user_lname').val(localStorage.getItem('lastname'));
        $('#user_email').val(localStorage.getItem('billing_email'));
        $('#billing_first_name').val(localStorage.getItem('billing_first_name'));
        $('#billing_last_name').val(localStorage.getItem('billing_last_name'));
        $('#billing_company').val(localStorage.getItem('billing_company'));
        $('#billing_address_1').val(localStorage.getItem('billing_address_1'));
        $('#billing_address_2').val(localStorage.getItem('billing_address_2'));
        $('#billing_city').val(localStorage.getItem('billing_city'));
        $('#billing_postcode').val(localStorage.getItem('billing_postcode'));
        $('#billing_country').val(localStorage.getItem('billing_country'));
        $('#billing_state').val(localStorage.getItem('billing_state'));
        $('#billing_phone').val(localStorage.getItem('billing_phone'));
        $('#billing_email').val(localStorage.getItem('billing_email'));
    })
}

function menu_hide()
{
    $("#menu").removeClass("active");
}

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



function login_status(){
    if(localStorage.getItem('login') == 0 ){
        return 0;
    }else{
        return 1;
    }
}



function product_page(){
    if(login_status(localStorage.getItem('login')) == 0 ){
        login_page();
    }else{
        $('#page_title').text('PRODUCT');
        $('#page_desc').text('product description text');
        $('#page_content_view').load('page/product.html');
        var varCurrency =  localStorage.getItem('currency');
        $.getJSON(wordpress_product, function(json) {
            var product_length = json.length;
            var product_data = json;
            //console.log("JSON Data: "+json[0].post_title+" "+ json[0].meta_value);
            for(var a = 0; a <= product_length - 1; a++){

                var content = `


<div class='col-md-4'>   
<div class="panel panel-colorful">
    <div class="panel-heading ui-draggable-handle">
        <h3 class="panel-title">`+json[a].post_title+`</h3>
    </div>
    <div class="panel-body">
        
        <p>`+json[a].post_content+`</p>
    </div>
    <div class="">
        <div class="btn btn-default" id="product_price">`+varCurrency+`  `+json[a].meta_value+`</div>
        <button type="button" onclick="order_product(`+json[a].ID+`)" class="btn btn-info pull-right" id="order_`+json[a].ID+`">ORDER</button>
    </div>
</div>
                    `;

                $('#loop_product').append(content);
            }

        });
    }
}

function login_user_now(data,username,password){
    if(data == '0'){
        show_btn();
        localStorage.setItem('login',1);
        localStorage.setItem('username',username);
        localStorage.setItem('password',password);
        currentuser();
        product_page();
    }else{
        show_error();
        login_btn_back();
    }
    login_btn_back();
}

function login_user_form(ee){
    login_btn_disabled();
    var username = $('#username').val();
    var password = $('#password').val();

    $.post(wordpress_url, $("#mobile_login_form").serialize(),function(data){
        login_user_now(data,username,password);
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

function login_page(){
    $('#page_content_view').load('page/login.html');
}
function account(){
    getUserData();
    $('#page_title').text('Account');
    $('#page_desc').text('account details');

    $('#page_content_view').load('page/account.html');
}

function logout(){
    hide_btn();
    var username = 0;
    var password = 0;
    localStorage.setItem('username',username);
    localStorage.setItem('password',password);
    window.location = 'index.html';
}

function order_product(id){
    var userid =  localStorage.getItem('userid');
    $('#order_'+id+'').attr('disabled',true);
    $('#order_'+id+'').text('please wait..');
    $.getJSON(wordpress_order+'?id='+id+'&&userid='+userid,function(data){
        if(data == 1){
            $('#order_'+id+'').text('Successfully Added');
            $('#order_'+id+'').attr('disabled',false);
        }
    });
}

function error(id){
    $('#'+id+'').html(`
        <div class="card-panel red lighten-2 white-text">wrong user or pass</div>
        `);
}