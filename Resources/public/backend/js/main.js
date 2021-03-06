$(function(){

    listeSortable();
    datagridSortable();
    autoFocus();
    populate_inputs();

    if ($.datepicker) {
		$('.calendar').datepicker({
			showAnim: 'fadeIn',
			dateFormat: 'yy-mm-dd',
			dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
			dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
			dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
			monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
			monthNamesShort: ['Jan', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Aôut', 'Sept', 'Oct', 'Nov', 'Déc']
		});
	}

    if ($.fancybox) {
        $("a.fancybox").fancybox({
            'speedIn'        :    600,
            'speedOut'        :    200,
            'transitionIn'  :   'elastic',
            'opacity'       :   true
        });
    }

    // Collapsable fields
    $(".collapsable_fields a.slide_link").click(function(e) {
        $(this).siblings(".slide_block").slideToggle("fast");
        $(this).toggleClass("selected");
        e.preventDefault();
    });
    
    // slide_link with selected state when slide-block is open (.row-error sets display block)
    $(".collapsable_fields.row-error a.slide_link").addClass('selected');

    // @deprecated, use row-error on parent tr
    $('.slide_block th.error').parents('.slide_block').show();

    // List mode togle
    $('.switch_list_mode a').attr('title', tooltipOrderMode);
    $('.switch_list_mode a').tooltip();

    $('.switch_list_mode a').click(function(e){
        switchListMode($(this));
        e.preventDefault();
    });

    // Event listener "keyup" on every elements with .filters  and .filter CSS Class triggering displaySubTotal()
    $('.filters .filter').bind('keyup', displaySubTotal);

    // Options toggle
    $('a.options_link').click(function(e) {
        $(this).next('.options').slideToggle();
        $(this).toggleClass('opened');
        e.preventDefault();
    });

    $('.options th.error').parents('.options').show();
    $('.options th.error').parents('.options').prev('a.options_link').addClass('opened');

    // Copy permalink to clipboard
    var clip = new ZeroClipboard($('#copy_permalink'), { moviePath: "/bundles/unifiksystem/backend/js/ZeroClipboard.swf"});
    var originalTitle;

    clip.on('dataRequested', function(client, args) {
        clip.setText($('#permalink_prefix').text() + $('input.permalink').val());
    });

    clip.on('complete', function(client, args) {
        originalTitle = $('#global-zeroclipboard-html-bridge').tooltip('option', 'content');
        $('#global-zeroclipboard-html-bridge').tooltip({ content: "Copied!"});
    });

    clip.on('mouseout', function(client, args) {
        if (originalTitle) {
            $('#global-zeroclipboard-html-bridge').tooltip({ content: originalTitle});
        }
    });

    // Tooltips
    $('input, .trigger_tooltip, #global-zeroclipboard-html-bridge').tooltip({
        position: { 'my': 'left+8 center', 'at': 'right center' },
        show: { duration: 200 }
    });

    $('#app-selector').change(function() {
        window.location.href = $(this).val();
    });
});

/*
 * Rend une liste sortable
 * (utilise le plugin jquery.tablednd_0_5.js)
 *
 * @author Emilie
 */
function listeSortable() {
    $(".liste_sortable").tableDnD({
        onDragClass: "on_drag",
        onDrop: function(table, row) {
            var rows = table.tBodies[0].rows;
            var liste_elements = "";
            for (var i = 0; i < rows.length; i++) {
                liste_elements += rows[i].id + ";";
            }

            $.ajax({
                type: "POST",
                url: url_ordre,
                data: {
                    elements: liste_elements
                },
                success: function(resultat) {
                    highlight($(row).children(), "#fcfecc");

                    // Update the ordering count in the table-cells
                    for (var i = 0; i < rows.length; i++) {
                        $(rows[i]).children('td.default_ordering').text(i + 1);
                    }
                }
            });
        }
    });
}

/*
 * Rend un datagrid sortable (adaptation de listeSortable)
 *
 * (utilise le plugin jquery.tablednd_0_5.js)
 */
function datagridSortable() {
    var $table = $('.manual_ordering');
    $table.tableDnD({
        onDragClass: "on_drag",
        onDrop: function(table, row) {
            var rows = table.tBodies[0].rows;
            var liste_elements = "";
            for (var i = 0; i < rows.length; i++) {
                liste_elements += i + '_' + $(rows[i]).data('row-id') + ";";
            }

            $.ajax({
                type: "POST",
                url: $table.data('ordering-path'),
                data: { elements: liste_elements },
                success: function() {
                    highlight($(row).children(), "#fcfecc", 500);
                }
            });
        }
    });
}


/**
 * @author JF
 * @param element conteneur a highlighter
 * @param color couleur HEX
 * @param delay delai de l'animation
 * @return url bool
 * @version 2008-10-22
 */
function highlight(element, color, delay) {
    if (!color) {
        color = 'yellow';
    }

    if (!delay) {
        delay = 500;
    }

    var bgColor = element.css("backgroundColor");
    element.animate({
            backgroundColor: color
        },
        500, function() {
            element.animate({
                backgroundColor: bgColor
            }, 500);
        });
}


/*
 * Autofocus dans le premier champ d'un formulaire
 */
function autoFocus() {
    if (document.forms[0]) {
        var l = document.forms[0].elements.length;
        var e = document.forms[0].elements;
        for (i = 0; i < l; i++) {
            if ((e[i].type == "text") || (e[i].type == "textarea") || (e[i].type == "iframe")) {

                // Pour IE : on doit vérifier si le champ n'est pas dans un élément qui est caché, car IE fait une erreur au focus
                if ($(e[i]).parents("tr").attr("id") == "tr_nom") {
                    if ($("#tr_nom").css("display") == "") {
                        e[i].focus();
                    }
                }
                else {
                    if (($(e[i]).parents("div").css("display") != "none") && ($(e[i]).css("display") != "none")) {
                        e[i].focus();
                    }
                }
                break;
            }
        }
    }
}


/*
 * Vérifier si une valeur alt="" est fournis au champs input et textarea
 * et si le input/textarea a l'attribut value vide, mettre la valeur du
 * alt dans l'attribut value.
 *
 * Était direct dans le .ready jusqu'a se que je remarque qu'il ne
 * s'appliquait pas au formulaire loader en ajax, maintenant on n'a qu'a
 * caller populate_inputs() sur le callback du load.
 */
function populate_inputs() {
	$(".filters input, .filters textarea").each(function() {
		if ($(this).attr("alt") != "") {
			$(this).addClass("unfocus");
			if ($(this).val() == "") {
				$(this).val($(this).attr("alt"));
			}
		}
	});

	$(".filters input, .filters textarea").focus(function() {
		if ($(this).attr("alt") != "") {
			if ($(this).val() == $(this).attr("alt")) {
				$(this).val("");
				$(this).removeClass("unfocus");
			}
		}
	});

	$(".filters input, .filters textarea").blur(function() {
		if ($(this).attr("alt") != "") {
			if ($(this).val() == "") {
				$(this).val($(this).attr("alt"));
				$(this).addClass("unfocus");
			}
		}
	});
}


/*
 * Switch between "search mode" and "order mode" in an entities list
 */
function switchListMode(linkObject) {

    linkObject.toggleClass('selected');

    listBoxObject = linkObject.parents('.list_box');
    listBoxObject.children('table').toggleClass('table-autosort');
    listBoxObject.children('table').toggleClass('liste_sortable');

    $('.tooltip').hide();

    if (linkObject.hasClass('selected')) {

        linkObject.children('img').attr('src', imgOrderModeOn);

        // Change tooltip text
        $('.tooltip').html(tooltipSearchMode);

        // Sort by default ordering
        defaultOrderingTh = listBoxObject.find('thead th.default_ordering');

        defaultOrderingTh.trigger('click');
        if (defaultOrderingTh.hasClass('table-sorted-asc')) {
            defaultOrderingTh.trigger('click');
        }

        // Disable sortable headers
        $.each(listBoxObject.find('thead th'), function(key, object) {
            $(object)[0].onclick = null; // [0] = Object sans le jquery
        });

        // Clear all filters
        listBoxObject.find('input.filter').val('');
        listBoxObject.find('input.filter').trigger('onkeyup');
        listBoxObject.find('tr.filters').hide();

        // Enable tableDnD plugin
        listeSortable();

    } else {

        linkObject.children('img').attr('src', imgOrderModeOff);

        // Enable the sorterable/filterable plugin
        populate_inputs();
        listBoxObject.find('tr.filters').show();
        Table.auto();

        // Disable tableDnD plugin
        listBoxObject.find('table tr').unbind();
        listBoxObject.find('table tr').css('cursor', '');

        // Change tooltip text
        $('.tooltip').html(tooltipOrderMode);
    }
}

/**
 * function displaySubTotal
 *
 * Show the number of displayed elements with .list_box and <tr id='item_*'>
 * Display the result into an element having .total and .sub-total CSS Class
 */
function displaySubTotal() {
    $('.list_box').each(function() {
        var spanContainer = $(this).find('.total .sub-total');
        var rowsObj = $(this).find("tr[id^='item_']");
        var rowsNb = 0;

        // Count every displayed rows in the table
        $.each(rowsObj, function (key, value) {
            if (value.style.display != 'none') {
                rowsNb++;
            }
        });

        // Show nothing if every elements are displayed, show the displayed elements count instead
        if (rowsNb == rowsObj.length) {
            spanContainer.empty()
        }
        else {
            spanContainer.empty();
            spanContainer.append(rowsNb + ' /');
        }
    });
}
