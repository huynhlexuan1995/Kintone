( function () {
    "use strict" ;
    kintone.events.on( 'app.record.index.show',function( event ){
        if(document.getElementById('my_index_button')!== null ) {
            return ;
        }
        var myIndexButton = document.createElement( 'button' );
        myIndexButton.id='my_index_button' ;
        myIndexButton.innerText = 'List button' ;

        // Process when button is clicked
        myIndexButton.onclick = function(){
            window.confirm('You pressed now?');
        };

        kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton);
    });
}) ();