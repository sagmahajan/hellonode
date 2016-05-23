exports.home=function(req,res){
  res.render('home',{title:'Welcome My Restaurant'});
  }


exports.category=function(req,res){
    var CategoryName=req.params.category;
    var title,heading;
    var imageCount=3;

    if(CategoryName==='starters'){
       title="Starters";
       imageCount=8;             
    }
    else if(CategoryName==='burgers'){
       title="Burgers";
        imageCount=4; 
    }
    else if(CategoryName==='desserts'){
       title="Desserts";
       imageCount=8;
    }
    else if(CategoryName==='pizza'){
       title="Pizza";
       imageCount=4;
    }
    else if(CategoryName==='soups'){
       title="Soups";
    }
    else if(CategoryName==='wraps'){
       title="Wraps";
       imageCount=6;
    }

    res.render('category',{
        title:title,
        category:CategoryName,
        numberOfImages:imageCount});
  }
