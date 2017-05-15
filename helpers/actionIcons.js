module.exports = (actionCallVariable, titleSubMenu, image, placementPriority, navigationViewInsertion) =>
 {
  actionCallVariable = new tabris.Action({
    title:titleSubMenu,
    placementPriority: placementPriority,
    image: {src: image,scaleMode:"auto"},
  }).on("select", function()
      {
        if(this.title === "Liste des commandes")
         {

         }

  }).appendTo(navigationViewInsertion);

    return actionCallVariable;
 };
