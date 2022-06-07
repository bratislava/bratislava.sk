This document is when you want to add a new component to the application and if that component is used widely across all the pages.

# 1. Add component to strapi

- go to this location in strapi
  http://localhost:1337/admin/plugins/content-type-builder/content-types
- there you can see the `components` in the bottom of the sidebar.
- then click on the add new component button.
- create a component based on your data type.
- there are types of component in that components list, talk to the architecture person about the categorie that your component fall into.
- after creating the component add the component into the `collection-type`, as showen below in image.
  ![alt text](./assets/add-new-component-in-collection-type.png)
- `sections` type is basically in blog-pages, when you want to give the strapi admin the control over the content. so with this they can add the component or not.
- so now we are done with the strapi visual component creation

# 2. add or update the query to grab newly created component in strapi

- we need the new data of the component's that we created
- so first create your query into grapiQL explorer and check wheather or not you are getting the proper response.
- so then you can add this query to the .graphql file under
  > `next/graphql/queries/*.graphql`.
- well it depends on the task whether you have to edit existing query or create a new one.
- when you finish adding the query to your project then hit this command to generate types dynamiclly that will be helpfull for further development (run it from `next` directory)
  > `yarn gen`;
- after successfully running above command you are all set to add this query into the page you want and bind the data.
