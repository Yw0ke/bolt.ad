$(document).ready(function(){
	var headerHeight = $('header').height();

	/* Margin-top #home */
	$('#home').css({ marginTop: headerHeight });
	$(window).resize(function(){
		headerHeight = $('header').height();
		$('#home').parent().css({ marginTop: headerHeight });

		managementHeight = 0;
		$('#management > ul > li').css('height', 'auto').each(function(){
			if( $(this).height() > managementHeight ) {
				managementHeight = $(this).height();
			}
		});
		$('#management > ul > li').css('height', managementHeight + 19);

		referencesHeight = 0;
		$('#references > ul > li').css('height', 'auto').each(function(){
			if( $(this).height() > referencesHeight ) {
				referencesHeight = $(this).height();
			}
		});
		$('#references > ul > li').css('height', referencesHeight + 20);
	});

	/* Scroll to */
	$('.local-link').localScroll({lock: true, offset: -headerHeight, duration: 600});
	$('.local-link').click(function(){
		$("#home").trigger( 'slideTo', 0 );
		$("#slide-demarche").trigger( 'slideTo', 0 );
		$("#slide-offre").trigger( 'slideTo', 0 );
	});

	/* Flèches Démarche */
	$('#demarche > ul a').hover(function(){
		$(this).find('span span').addClass('hover');
	}, function(){
		$(this).find('span span').removeClass('hover');
	});

	
	/* Carousels */
	$("#home").carouFredSel({
		height              : "variable",
		auto                : false,
		items               : 1,
		circular            : false,
		infinite            : false,
		responsive          : true,
		width               : "100%",
		prev: {
			button          : "#slide-home-prev",
			fx              : 'uncover-fade'
		},
		next: {
			button          : "#slide-home-next",
			fx              : 'cover-fade'
		}
	});
	

	$("#slide-demarche").carouFredSel({
		auto                : false,
		items               : 1,
		circular            : false,
		infinite            : false,
		scroll : {
			fx              : "fade"
		}
	});

	$('#slide-demarche').trigger( 'linkAnchors', [ '#demarche', 'a' ] );
	

	$("#slide-offre").carouFredSel({
		height              : "variable",
		auto                : false,
		items               : 1,
		circular            : false,
		infinite            : false,
		responsive          : true,
		prev                : "#slide-offre .prev",
		next                : "#slide-offre .next"
	});

	$('#slide-offre').trigger( 'linkAnchors', [ '#slide-offre', '.service' ] );

	$('#slide-offre .retour').click(function(){
		$("#slide-offre").trigger( 'slideTo', 0 );
		return false;
	});


	/* Validation Formulaire */
	$(".lt-ie10 #formStep").validate();

	$.extend($.validator.messages, {
		required: "Ce champ est requis"
	});


	/* Edition */
	$(".editable").click(function (e) {
	    $(".save-edition").hide();
	    $(this).next('.save-edition').show();
	    e.stopPropagation();
	});
	 
	$(document).click(function() {
	    $(".save-edition").hide();
	});

	$(".save-edition").click(function (e) {
    var content = $(this).prev('.editable').html();
        $.ajax({
            url: 'save.php',
            type: 'POST',
            data: {
            content: content
            },
            success:function (data) {
                if (data == '1')
                {
                    $("#status")
                    .addClass("success")
                    .html("Les données ont été sauvées avec succès")
                    .fadeIn('slow')
                    .delay(3000)
                    .fadeOut('slow');
                }
                else
                {
                    $("#status")
                    .addClass("error")
                    .html("Erreur, les données n'ont pas pu être sauvées")
                    .fadeIn('slow')
                    .delay(3000)
                    .fadeOut('slow');
                }
            }
        });
    });

});

$(window).load(function(){
	/* Management */
	var managementHeight = 0;
	$('#management > ul > li').each(function(){
		if( $(this).height() > managementHeight ) {
			managementHeight = $(this).height();
		}
	});

	$('#management > ul > li').css('height', managementHeight + 19);

	/* Références */
	var referencesHeight = 0;
	$('#references > ul > li').each(function(){
		if( $(this).height() > referencesHeight ) {
			referencesHeight = $(this).height();
		}
	});

	$('#references > ul > li').css('height', referencesHeight + 20);
});