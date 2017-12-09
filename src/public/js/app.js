/**
 * This would go in the 'description' field automatically
 * as it has no "@something" label in the begining.
 * @type {Object} But these below here
 * will be added to the "@type" label automatically.
 * This way you can freely continuate writing, and the
 * document generator will take care of these details
 * @add
 * @all
 * @the
 * @labels
 * @you
 * @want {And} Add any type of information beside.
 * No matter if it is multiline.
 */
var App = {};

/**
 * I can even include a multiline description here
 * and continue writing here
 * the description
 * by default this goes to the description directly
 * @type {String}
 * @description Title of the application
 */
App.title = "Some title";

/**
 * @type {Function}
 * @description Returns the title
 * @returns {String}
 */
App.getTitle = function () {
    "use strict";
    return App.title;
};

/**
 * @type {Function}
 * @description Sets the title to the specified value
 * @returns {Undefined}
 */
App.setTitle = function (title) {
    "use strict";
    App.title = title;
};