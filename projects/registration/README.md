# About

This library was created for learning purpose. Documentation has been written enough for me to later remember how to use this library.

## How to use
`validationApi` is required. It's a url that angular will use to check if username or email is already in use. Endpoint has to include both `emailTakenCheck` and `userTakenCheck` (POST). Enpoints have to return `Boolean` (true/false).

`GermelRegistration` is the name of module that needs to be imported in app module.
### Example
`<germel-registration 
    [validationApi]="'http://localhost:8080/server/create-account/'"
    [redirect]="true"
    [redirectUrl]="'/success'"
>
</germel-registration>`
                             
