$(document).ready(function(){

    $('.filter-icon').on('click', function(){
       $('.collection-filter').addClass('active');
    })

    $('.filter-close').on('click', function(){
       $('.collection-filter').removeClass('active');
    })


    // price filter 
    const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-filter-input input"),
    range = document.querySelector(".price-filter-slider .progress");
    let priceGap = 10;

        priceInput.forEach((input) => {
            input.addEventListener("input", (e) => {
                let minPrice = parseInt(priceInput[0].value),
                maxPrice = parseInt(priceInput[1].value);

                if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "input-min") {
                    rangeInput[0].value = minPrice;
                    range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
                } else {
                    rangeInput[1].value = maxPrice;
                    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                }
                }
            });
        });

        rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

            if (maxVal - minVal < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap;
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
            } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        });
    });

    // sort filter 
    $('.collection-sort').on('change', function(){
        var sort = $(this).val();
        var coll = $('.collection_name').val();

        if( coll == 'products') {
            coll = 'all'
        } else {
            coll = $('.collection_name').val();
        }
        var option_name = '';
        $(".filter-item-checkbox:checked").each(function(index, element){
            if(index !== (length -1 )) {
                option_name += $(this).data('option') + '=';
                option_name += $(this).val() + '&';
            } else {
                option_name += $(this).data('option') + '=';
                option_name += $(this).val();
            }
        });
        if(option_name !='') {
            var url = '/collections/' + coll + '?' + option_name + '&sort_by=' + sort; 
            var filter_url = '/collections/' + coll + '?' + option_name + '&sort_by=' + sort;
            window.history.pushState({}, null, filter_url);
            filter_update(url);
        }else{
            var url = '/collections/' + coll + '?sort_by=' + sort; 
            var filter_url = '/collections/' + coll + '?sort_by=' + sort;
            window.history.pushState({}, null, filter_url);
            filter_update(url);
        }
        
    });
});

function sortCheck(e, el) {
    var sort = $(el).val();
    var coll = $('.collection_name').val();

    if( coll == 'products') {
        coll = 'all'
    } else {
        coll = $('.collection_name').val();
    }
    var option_name = '';
    $(".filter-item-checkbox:checked").each(function(index, element){
        if(index !== (length -1 )) {
            option_name += $(this).data('option') + '=';
            option_name += $(this).val() + '&';
        } else {
            option_name += $(this).data('option') + '=';
            option_name += $(this).val();
        }
    });
    if(option_name !='') {
        var url = '/collections/' + coll + '?' + option_name + '&sort_by=' + sort; 
        var filter_url = '/collections/' + coll + '?' + option_name + '&sort_by=' + sort;
        window.history.pushState({}, null, filter_url);
        filter_update(url);
    }else{
        var url = '/collections/' + coll + '?sort_by=' + sort; 
        var filter_url = '/collections/' + coll + '?sort_by=' + sort;
        window.history.pushState({}, null, filter_url);
        filter_update(url);
    }
}

function filterCheck(){
    var option_name = '';
    var length = $('.filter-item-checkbox:checked').length;
    var sort = $('.sort-checkbox:checked').val();
    var coll = $('.collection_name').val();

    if( coll == 'products') {
        coll = 'all'
    } else {
        coll = $('.collection_name').val();
    }

    $(".filter-item-checkbox:checked").each(function(index, element){
        if(index !== (length -1 )) {
            option_name += $(this).data('option') + '=';
            option_name += $(this).val() + '&';
        } else {
            option_name += $(this).data('option') + '=';
            option_name += $(this).val();
        }
    });

    $('.added_filter').text(length);

    if(option_name !='') {
        var url = '/collections/' + coll + '?' + option_name + '&sort_by=' + sort; 
        var filter_url = coll + '?' + option_name + '&sort_by=' + sort
        window.history.pushState({}, null, filter_url);
        filter_update(url);
    }else{
        var url = '/collections/' + coll + '?sort_by=' + sort; 
        var filter_url = coll + '?sort_by=' + sort
        window.history.pushState({}, null, filter_url);
        filter_update(url);
    }
}

function filter_update(url){
    fetch(url)
    .then(response => response.text())
    .then(infoData => {
        var products = $(infoData);
        var items = $('.collection-products' , products);
        var filters = $('.collection-filter' , products);
        $('.collection-products').replaceWith(items);
        $('.collection-filter').replaceWith(filters);
    });
}

function filterActive(e,el){
    $(el).next().slideToggle(); 
    $(el).toggleClass('inactive');
}