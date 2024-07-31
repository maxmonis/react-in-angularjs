This codebase is designed to demonstrate how React can be incorporated into an
outdated framework like AngularJS. It's a great way to gradually migrate an
application because new features can be created in React and whenever updates to
existing logic are required, legacy components can be replaced with React ones.
This is preferable to a full scale rewrite for applications where doing so would
be time consuming and likely to cause regressions.

While this example is within an AngularJS application, the React code creates
HTML elements which could be interpolated into most any ecosystem. There are a
few parts of it which are customized for AngularJS but they could be adjusted
quite easily to match the syntax of any legacy application's stack.

This is a fork of an application which takes the developer through the process
of building a web application using AngularJS. Each tagged commit is a separate
lesson teaching a single aspect of the framework. The full tutorial can be found
at https://docs.angularjs.org/tutorial.
