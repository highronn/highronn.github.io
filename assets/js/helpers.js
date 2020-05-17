var jQuery3_4_1 = $.noConflict(true);

// scroll navbar disappearance
var lastScrollTop = 0;
var scrollDiff = 0;

(function($, document, window, viewport){
    $(document).ready(function() {
        if(viewport.is('xs'))
        {
            document.getElementById('return-top').classList.add('fix-bot');
        }
    });

    $(window).resize(
        viewport.changed(function()
        {
            if(viewport.is('>xs'))
            {
                navbar.style.top = 0;
                document.getElementById('return-top').classList.remove('fix-bot');
            }
            else
            {
                document.getElementById('return-top').classList.add('fix-bot');
            }
        })
    );

    $(window).scroll(
        function() {
            if(viewport.is('<=sm'))
            {
                var st = window.pageYOffset || document.documentElement.scrollTop;

                var diff = lastScrollTop - st;
                scrollDiff = Math.min(Math.max(scrollDiff + diff, -56), 0);
                if(scrollDiff < 0)
                {
                    $('#collapsibleNavbar').collapse('hide');
                }
                navbar.style.top = scrollDiff + 'px';
                lastScrollTop = st;
            }
        }
    );
})(jQuery3_4_1, document, window, ResponsiveBootstrapToolkit);

var addEvent = function(object, type, callback)
{
    if (object == null || typeof(object) == 'undefined')
      return;

    if (object.addEventListener)
    {
        object.addEventListener(type, callback, false);
    }
    else if (object.attachEvent)
    {
        object.attachEvent("on" + type, callback);
    }
    else
    {
        object["on"+type] = callback;
    }
};

function set_cover_borders()
{
    var mainH = document.documentElement.clientHeight;
    document.body.style.height = (mainH-56) + 'px';
}

addEvent(window, "resize", set_cover_borders)

jQuery3_4_1(document).ready (function ($) {

    set_cover_borders();
    AOS.init();
    navbar = document.getElementsByClassName("navbar")[0];
    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    /* scroll on menu clicking */
    $("nav a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            $('#collapsibleNavbar').collapse('hide');

            $('html, body').animate(
                {
                    scrollTop: $(hash).offset().top
                },
                500,
                function()
                {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                }
            );
        }
    });
});
