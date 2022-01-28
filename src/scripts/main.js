$(function(){


    let canNext = false

    // slides-handlers
    $('.house-card').on('click', function() {
        $('.house-card').each(function() {
            $(this).children('button.toggle-button').removeClass('active')
        })
        $(this).children('button.toggle-button').toggleClass('active')
        canNext = true
    })

    $('.button-outer').on('click', function() {
        $('.button-outer').each(function() {
            $(this).children('button.toggle-button').removeClass('active')
            $(this).children('button.btn').attr('data-active', 'false')
        })

        $(this).children('button.toggle-button').toggleClass('active')
        $(this).children('button.btn').attr('data-active', 'true')
        canNext = true
    })

    $('.furniture-card').on('click', function() {
        $(this).children('button.toggle-button').toggleClass('active')
        canNext = true
    })



    let renderSteps = (count) => {
        let stepGraphs = $('.step-graph__part')
        for(let i = 0; i < stepGraphs.length; i++) {
            $(stepGraphs[i]).removeClass('active')
        }
        for(let i = 0; i < count; i++) {
            if(!$(stepGraphs[i]).hasClass('active') && i < count) {
                $(stepGraphs[i]).addClass('active')
            }
        }
        $('.button-outer').each(function() {
            $(this).children('button.btn').attr('data-active', 'false')
        })
    }

    // slide function
    let changeSlide = (way) => {
        let stepElem = $('span[data-step]')
        let currentStep = stepElem.attr('data-step')
        if(way === 'next') {
            $($('.slide-wrapper')[currentStep-1]).css('display', 'grid')
            $($('.slide-wrapper')[currentStep-1]).prev().css('display', 'none')
        }
        if(way === 'prev') {
            $($('.slide-wrapper')[currentStep-1]).css('display', 'grid')
            $($('.slide-wrapper')[currentStep-1]).next().css('display', 'none')
        }
    }
    
     // slide buttons (prev-next)
     $('.prev').on('click',function() {
        let stepElem = $('span[data-step]')
        let currentStep = stepElem.attr('data-step')
        if(currentStep == 7) {
            $('button.next').css('display', 'block')
        }
        if(currentStep <= 1) {
            return
        }
        stepElem.attr('data-step', --currentStep).html(currentStep)
        $('.toggle-button.active').removeClass('active')
        changeSlide('prev')
        renderSteps(currentStep)
    })

    function takeStep() {
        return 
    }

    $('.next').on('click', function() {
        let checkmark = $('svg')
        let stepElem = $('span[data-step]')
        let currentStep = $('span[data-step]').attr('data-step')

        if(currentStep == 6) {
            
            // checkmark animate
            if (!checkmark.hasClass('animate')) {
              checkmark.addClass('animate')
            }
            
            $('button.next').css('display', 'none')
            $('button.prev').css('display', 'none')
        }
        if(canNext || currentStep == 6) {
            let stepElem = $('span[data-step]')
            let currentStep = stepElem.attr('data-step')
            stepElem.attr('data-step', ++currentStep).html(currentStep)
            canNext = false
            $('.toggle-button.active').removeClass('active')
            changeSlide('next')
            renderSteps(currentStep)
        }
    })

    // range settings
    $( "#slider-range-max" ).slider({
        range: "max",
        min: 1,
        max: 25,
        value: 5,
        slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
        }
    });
    $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
})