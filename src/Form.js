import React, { useState } from "react";

const Form = props => {
  const { addTeamMember } = props;

  /*
    We could have a single state var for each form element. But
    it's easier and better to have a single state var that has
    a property for each form element. Any change to one of the
    properties is a change in state, which causes a re-render.

    Here, we have a single state variable for a "note".

    This component is the right place to have it because this
    component is where the form elements are that contain the
    data for the note.

    Changing this note var doesn't do anything permanent... it
    just prepares the note var for use in adding a note to our
    "notes" collection (through a prop function... see below, and
    in index.js.)
  */
  const [teamMember, setTeamMember] = useState({
    name: "",
    email: "",
    role: ""
  });

  /*
    We can have a single handleChange() event handler for 
    any form element that has a corresponding state var.
    
    The best way to manage forms with multiple inputs is to
    have an object with multiple properties: one for each form 
    element.

    When any of the form elements changes, we want to change
    the corresponding property in our state var (object).

    We can accomplish this with a single handleChange() 
    event handler by using "dynamic property names". 

    This is a feature of JavaScript that allows you to use
    a variable or other computed value to identify a property.

    By ensuring that the "name" attribute on form elements
    matches their corresponding property names in the state
    var object, we can easily identify which property in
    the object to change.

    The syntax is : 

        { [property_name]:value }

    ...where "property_name" is either a variable, or an
    evaluated/computed value such as a number or string, and
    the computed value is in square brackets. The square
    brackets cause JavaScript to take the computed value and
    interpret it as a property name.

    By using the "target.name" value from the "event" object
    that is passed to the event handler when the event occurs, 
    we can identify not only what element caused the event, but
    what property in the state var object to update.

    The long way to do this in the past would have been:

        switch(event.target.name) {
          "body" : 
            setNote({title: note.title, body: event.target.value}); 
            break;
          "title" : 
            setNote({title: event.target.value, body: note.body}); 
            break;
        }

    This would have also required us to modify this code block
    every time the "note" state var object schema changed (i.e.
    add or remove or rename a property.)

    Using the "spread" operator, plus dynamic property names,
    we are able to simplify and future-proof our code.

    The spread operator allows us to create a new object based
    on all of the properties of an existing object, without knowing
    (or caring) what those properties are named, or how many of 
    them there are.

    Using the spread operator, you can "overwrite" any existing
    property by specifying the specific property name and its
    new value.

    Try this to understand how the spread operator works:

        const myVar = {prop1: 1, prop2: "2", prop3: "thee"}
        const myNewVar = {...myVar} // this is the same as myNewVar = myVar
        const myNewNewVar = {...myVar, prop2: "too"}
        console.log(myVar)
        console.log(myNewVar)
        console.log(myNewNewVar)
  */
  const handleChange = e => {
    setTeamMember({ ...teamMember, [e.target.name]: e.target.value });
  };

  /*
    The default behavior of the browser on "submit" of a form is
    to reload the page. This causes the form to be cleared, and causes
    the form data to be sent to a URL.

    In a Single Page App, we don't want either of these (a reload would
    wipe out all of our state variables, plus the user sees an ugly white
    screen while the browser reloads).

    We use the preventDefault() event method to prevent the browser from
    doing either of these things.

    We then take the local state var object ("note"), which contains
    the contents of the form (because the handleChange() event handler 
    keeps the state var in sync with the form), and pass it to a function
    in the <App/> component, where the new note can be added to
    the "notes" list, and rendered through the <Notes/> component.

    The local state var object "note" is passed to a function called
    "addNode()" that is defined in the <App/> component - it's defined 
    there, because it needs to be able to access the "notes" state var that is
    defined by <App/> (so <App/> can pass them to the <Notes/> component
    for display).

    The <App/> component may define the addNote() function, but we can execute
    it from anywhere. It's "closure" is defined by the App() component
    function and its closure, which means that the addNode() function has 
    access to the "notes" state var defined in App().

    In order to pass our new note data to addNode(), we need to 
    execute it from the NodeForm() component function, where the new note
    data exists (in the state var object "note").

    Since addNode() is defined in App(), we have to pass it to NodeForm()
    as a property.

    We execute it here in the handleSubmit() function (which is assigned
    below as the OnSubmit event handler for the form). When the user 
    "submits" the form, the note data is passed back to the addNode()
    function, where it adds it to the "notes" state var object in App().

    After adding the note to the collection, we clear our local state
    var. One reason we do this is because below, we "bind" the properties
    of the state var object to the different form elements through
    their own "value=" attributes. This causes React to change the
    form values when the state variable is changed for any reason.

    So, we have the state variable changing when the form elements change,
    and the form elements changing when the state variable changes.

    This way, they are always in sync.

    See https://www.w3schools.com/tags/ev_onsubmit.asp for info on the
    onSubmit() event handler.

    By default, in a browser, when a form is "submitted" (the user
    clicks on a "submit" button or presses "enter" from the form), 
    the browser will take all of the values of the form elements within
    the <form/> tag and send them to the HTTP server that served the
    form. This can be overriden by setting the "action" attribute on the
    <form/> element to a URL of a different server.

    By default, the form values are submitted to the server or "action target"
    in a query string appended to the URL in an HTTP GET request: 

        ex. https://sever.example.com?formVar1="val1"&formVar2="val2"&etc

    By adding the "method" attribute to the <form/> element, you can
    cause the browser to send a different HTTP request, such as "POST".

    In the case of a POST request, the form element values are formed
    into the same query string, but the query string is added to the 
    body of the request, and a content-length header added to indicate
    to the server how big the body content is.

    When using React to create a single-page application, you don't want
    a GET or POST to send the data to the server. Instead, you override
    the default onSubmit() behavior. The form data should be synchronized
    with local state variables so they can be available to the
    onSubmit() handler.

    See the following URL for a diagram of the difference between
    client/server forms and SPA forms: https://tinyurl.com/y4hacc95 
  */
  const handleSubmit = e => {
    e.preventDefault();
    addTeamMember(teamMember);
    setTeamMember({
      name: "",
      email: "",
      role: ""
    });
  };

  /*
    In the JSX that the <NoteForm/> component returns, we are
    just using the plain 'ol HTML <form/> element, and 
    the <label/>, <input/>, and <button/> elements.

    You can learn about these (and many other <form/> elements)
    here: 
    
      * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
      * https://www.w3schools.com/html/html_forms.asp 
    
    Form elements are nested within a <form/> tag.

    All elements support various events. 

      * <form/> supports OnSubmit, which fires when the form is "submitted"
      * <input/> supports OnChange, which fires when the content of the
        input box changes (keystrokes)
  
    We use these event handlers to manage keeping the internal
    "state" (through the useState() hook) and the form elements in-sync.

    An overriding goal is to preven direct DOM manipulation or
    monitoring:

      * If a relevant state var changes, the corresponding form element
        value should change to match.
      * If a form element value changes, the corresponding state var 
        value should change to match.

    The "value=" attributes/properties "bind" the form element value to
    the state var object property value. This is what causes React to
    keep them in sync.

    Note also the onSubmit and onChange event handlers.

    Note also the "type=submit" attribute on the button. This
    makes the default button behavior "submit" the form (i.e. execute
    the onSubmit() event handler). You can also cause the "submit"
    event to fire by pressing "enter" from any of the form 
    elements on-screen.
  */
  return (
    <div className="form">
      <h2>Add a Team Member</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={teamMember.name}
          name="name"
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={teamMember.email}
          name="email"
          type="email"
          onChange={handleChange}
        />
        <label htmlFor="role">Role</label>
        <input
          id="role"
          value={teamMember.role}
          name="role"
          type="text"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
