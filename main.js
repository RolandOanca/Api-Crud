var total_pages;
var tablePage = 1;
var inputVal = $('input[name="search_box"]').val();

// $(function(){
    $(document).ready(function(){
    var orders= ('#orders');
  
    var orderTemplate = $('#order-template').html();
    
    function addOrder(order) {
        $('#orders').append(Mustache.render(orderTemplate, order[0]));
    }
    function addNorder(order) {
        $('#orders').append(Mustache.render(orderTemplate, order));
    }

     /// Pagination
   
  
    
   function itmListing(page) {      
    $.ajax({
        type:'GET',
        url:'/crud-api/read.php',
        data:{
            page:page,
            pagelimit:5,
            
        },

        success: function(orders) {
            $.each(orders, function(i, order){
                current_page = page;
                if(order[0].total_pages) {
                    total_pages = order[0].total_pages;
                }                                    
                console.log(order);   
         
                addOrder(order);
                
            });        

            for(var i = 1; i <= total_pages; i++) {
                var currentPage = i;
                if(!$('#page-' + i).length) {
                    var li = $('<li>');
                    li.attr({
                        "id": "page-" + i,
                        "class": "page-item" 
                    })
                   

                    var anchor = $('<a>');
                    anchor.addClass("page-link");
                    anchor.attr("id", i);
                    anchor.on("click", function(e) {
                        $('tbody.loop').empty();
                        // console.log("itmListing("+e.currentTarget.id+");");
                        itmListing(e.currentTarget.id);
                    });
                    anchor.html("" + i);

                  


                    li.append(anchor);
                    $('ul.pagination').append(li);
                   
                    
                   
                }        
            }

            if(!$('#next-page').length){
                // Next creat and append
                var next = $('<li>');
                next.attr({
                    "id": "next-page",
                    "class": "page-item" 
                });
                // Previu creat and append
                var prev = $('<li>');
                prev.attr({
                    "id": "previous-page",
                    "class": "page-item" 
                });
                var p = $('<a>');
                p.addClass("page-link");
                p.attr("id", i);
                p.html("Previous");

         
                var a = $('<a>');
                a.addClass("page-link");
                a.attr("id", i);
                a.html("Next");

                next.append(a);  
                prev.prepend(p);

                $('ul.pagination').prepend(prev);
                $('ul.pagination').append(next);

            }; 
        }        
    });

   }

   $("body").on("click", "#next-page", function(){
    
    let inputVal = $('input[name="search_box"]').val();

   
    tablePage ++;

    var nrPages = $('.pagination li[id^="page-"]').length;
    if(tablePage <= nrPages) {
        $('tbody.loop').empty();

        if(inputVal === "") {
            itmListing(tablePage);
        } else {
            $.ajax({
                type:'GET',
                url:'/crud-api/read.php?search=' + inputVal,
                data:{
                
                    current_page:tablePage,
                    pagelimit:5
                    
                },

                success:function(orders){
                    $.each(orders, function(i, order){
                        current_page = tablePage;


                 
                        addOrder(order);
                        
                        
                    });      
                }
            });
                
        
        }
        
 
    }
});



    $("body").on("click", "#previous-page", function(){
        tablePage = --tablePage > 0 ? tablePage : 1;
        let inputVal = $('input[name="search_box"]').val();
        $('tbody.loop').empty();
    
            if(inputVal === "") {
                itmListing(tablePage);
            } else {
                $.ajax({
                    type:'GET',
                    url:'/crud-api/read.php?search=' + inputVal,
                    data:{
                    
                        current_page:tablePage,
                        pagelimit:5
                        
                    },
    
                    success:function(orders){
                        $.each(orders, function(i, order){
                            current_page = tablePage;
    
    
                     
                            addOrder(order);
                            
                            
                        });      
                    }
                });
                    
            
            }

    });
   itmListing(1);
   
   $("body").on("click", '.pagination li[id^="page-"]', function(){
  
        let inputVal = $('input[name="search_box"]').val();
        let currentPage = $(this).find('a').attr('id');
        $.ajax({
            type:'GET',
            url:'/crud-api/read.php?search=' + inputVal,
            data:{
            
                current_page:currentPage,
                pagelimit:5
                
            },
            
            success: function(orders) {
                $.each(orders, function(i, order){
                    current_page = currentPage;
                    if(order[0].total_pages) {
                        total_pages = order[0].total_pages;
                    }    
                   
                                                  
                    console.log(order);   
             
                    addOrder(order);
                     itmListing(e.currentTarget.inputVal);
                    
                });     
            }
        })
    });

    
    
   
   /// Search

   $("#searchbtn").on("click",function(){
    let inputVal = $('input[name="search_box"]').val();
    console.log(inputVal);
    $.ajax({
        type:'GET',
        url:'/crud-api/read.php?search=' + inputVal,
        data:{
     
            pagelimit:5,
            
        },
        success: function(orders) {
            
           
            if(!orders.length) {
                $('#nodata').addClass('visibel');
                $('.pagination').addClass('novisibel');
                $('tbody.loop').empty();
               
            } else {
                $('tbody.loop').empty();
                $('#nodata').removeClass('visibel');
                $.each(orders, function(i, order){
                    
                    $('.page-item').remove();

                    if(order[0].total_pages) {
                        total_pages = order[0].total_pages;
                    } 
                      addOrder(order);

                      for(var i = 1; i <= total_pages; i++) {
                        var currentPage = i;
                        if(!$('#page-' + i).length) {
                            var li = $('<li>');
                            li.attr({
                                "id": "page-" + i,
                                "class": "page-item"
                            })
                            var anchor = $('<a>');
                            anchor.addClass("page-link");
                            anchor.attr("id", i);
                            anchor.on("click", function(e) {
                                $('tbody.loop').empty();
                                console.log("itmListing("+e.currentTarget.inputVal+");");
                                itmListing(e.currentTarget.inputVal);
                            });
                            anchor.html("" + i);
                            li.append(anchor);
                            $('ul.pagination').append(li);
                        }

                           
                        }        
                        if(!$('#next-page').length){
                            // Next creat and append
                            var next = $('<li>');
                            next.attr({
                                "id": "next-page",
                                "class": "page-item" 
                            });
                            // Previu creat and append
                            var prev = $('<li>');
                            prev.attr({
                                "id": "previous-page",
                                "class": "page-item" 
                            });
                            var p = $('<a>');
                            p.addClass("page-link");
                            p.attr("id", i);
                            p.html("Previous");
            
                     
                            var a = $('<a>');
                            a.addClass("page-link");
                            a.attr("id", i);
                            a.html("Next");
            
                            next.append(a);  
                            prev.prepend(p);
            
                            $('ul.pagination').prepend(prev);
                            $('ul.pagination').append(next);

                            

                       
            
                        };  
                   
                   

                });
            } 
                       
        }
    });
});


      /// Insert

    $('#add-order').on('click', function(e) {
     
        e.preventDefault();

        var unindexed_array = $('#form').serializeArray();
        var indexed_array = {};
        
        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });
        indexed_array = JSON.stringify(indexed_array);
        // console.log(indexed_array);
        $.ajax({
            type:'POST',
            url:'/crud-api/insert.php',
            data: indexed_array,
            
            success: function(newOrder) {
            
                addNorder(newOrder);
             
                
            },
           
            error:function(res) {
                console.log(res);
                
            }
        });
        $(document).on('click','#add-order',function(){
            location.reload(true);
         });
      
    });
    
      /// Delete

    $('#orders').delegate('.remove', 'click', function() {
        let jsonArray = {};
     
        jsonArray['id'] = $(this).attr('data-id');
     
        jsonArray = JSON.stringify(jsonArray);

        // console.log(jsonArray);
        $.ajax({
            type:'DELETE',
            url:'/crud-api/delete.php',
            data: jsonArray,
            success: function(response) {
                $('tbody.loop').empty();
                itmListing(current_page);
            },
            error:function(res) {
                alert('error');
            }
          
            
        });
        
    });

    // Edit Section
    let data_id = '';
    
    $('#orders').on( 'click', '.editOrder', function() {
        data_id = $(this).attr('data-id');
        // var item = $(this).closest('td'); 
        let spanText = $('tbody[data-id="'+data_id+'"] td');
        spanText.find('input.nume').val(spanText.find('span.nume').html());
        spanText.find('input.locatie').val(spanText.find('span.locatie').html());
        spanText.find('input.email').val(spanText.find('span.email').html());
        spanText.find('input.telefon').val(spanText.find('span.telefon').html());
        spanText.find('input.infintare').val(spanText.find('span.infintare').html());
        spanText.find('input.salariati').val(spanText.find('span.salariati').html());
        spanText.addClass('edit');
   
        // $('input').val(spanText.find('span.infintare').html()); 
        spanText.find('span').addClass('noedit');
        spanText.find('input').addClass('edit');
        spanText.find('button.editOrder').addClass('noedit');

        spanText.find('button.saveEdit ').removeClass('noedit');
        spanText.find('button.cancelEdit').removeClass('noedit');

        spanText.find('button.saveEdit ').addClass('edit');
        spanText.find('button.cancelEdit').addClass('edit');
    });

    $('#orders').delegate('.cancelEdit', 'click', function() {
        let spanText = $('tbody[data-id="'+data_id+'"] td');
        spanText.find('span').removeClass('noedit');
        spanText.find('input').removeClass('edit');
        
        spanText.find('button.editOrder').removeClass('noedit');

        spanText.find('button.saveEdit ').addClass('noedit');
        spanText.find('button.cancelEdit').addClass('noedit');

   
    });

      
    $('#orders').delegate('.saveEdit', 'click', function(e) {
        e.preventDefault();
        let spanText = $('tbody[data-id="'+data_id+'"] td');
        console.log(data_id);
        var order = {
            id: data_id,
            nume: spanText.find('input.nume').val(),
            locatie: spanText.find('input.locatie').val(),
            email: spanText.find('input.email').val(),
            telefon: spanText.find('input.telefon').val(),
            nr_salariati: spanText.find('input.salariati').val(),
            data_infintare: spanText.find('input.infintare').val()

            
        };
        
        order = JSON.stringify(order);
        // console.log(order);

        
        $.ajax({
            type:'PUT',
            url:'/crud-api/update.php' ,
            data: order,
            
            success: function(order) {
                spanText.find('span.nume').html(order.nume);
                spanText.find('span.locatie').html(order.locatie);
                spanText.find('span.nume').html(order.email);
                spanText.find('span.nume').html(order.telefon);
                spanText.find('span.nume').html(order.infintare);
                spanText.find('span.nume').html(order.salariati);
                spanText.removeClass('edit');
                $('tbody.loop').empty();
                addNorder(order);
                $('tbody.loop').empty();
                itmListing(current_page);
            },
            
            
        
            error:function(res) {
                console.log(res);
                alert('error saving order');
            }
        });
    });
});
