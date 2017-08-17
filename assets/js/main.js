$(function(){   
    $("#loanmeet_table").colResizable({
        liveDrag:true, 
        gripInnerHtml:"<div class='grip'></div>", 
        draggingClass:"dragging", 
        resizeMode:'overflow',
        disabledColumns: [0]
    });
}); 