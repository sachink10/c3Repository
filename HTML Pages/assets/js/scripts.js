$('input[name="register"]').click(function () {
    $(this).tab('show');
});

$('#ex1').slider({
	formatter: function(value) {
		return 'Month: ' + value;
	}
});

$('#myModal').modal('show');
 $('#example').DataTable();
 
  $('.input-daterange').datepicker({
                    todayBtn: "linked"
                });


(function($){
    $('#User').validetta({
        onValid : function( event ) {
            event.preventDefault();
            $('#alert').empty()
                .append('<div class="alert alert-success">Succesfully</div>');
        },
        onError : function( event ){
            $('#alert').empty()
                .append('<div class="alert alert-danger">There are some errors.</div>');
        }
    }); 
	$('#admin').validetta({
        onValid : function( event ) {
            event.preventDefault();
            $('#alert').empty()
                .append('<div class="alert alert-success">Succesfully</div>');
        },
        onError : function( event ){
            $('#alert').empty()
                .append('<div class="alert alert-danger">There are some errors.</div>');
        }
    });  
});



 $('#Login').validetta({
        onValid : function( event ) {
            event.preventDefault();},
        onError : function( event ){           
        }
    }); 
	
	
	
	
