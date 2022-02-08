// Extra small devices (portrait phones, less than 576px)
// @media (max-width: 575.98px) { ... }

// Small devices (landscape phones, less than 768px)
// @media (max-width: 767.98px) { ... }

// Medium devices (tablets, less than 992px)
// @media (max-width: 991.98px) { ... }

// Large devices (desktops, less than 1200px)
// @media (max-width: 1199.98px) { ... }

export default {
    //our app is built on the largest size, no need to define on a larger screen
    up() {

    },
    // define when screen is smaller than the current setting
    down(size) {
        const sizes = {
            xs: "575.98px",
            sm: "767.98px",
            md: "991.98px",
            lg: "1199.98px"
        }
        return `@media (max-width:${sizes[size]})`
    }
}

// I guess the bracket notation is because it's behaving in similar way to 'computed'/'Dynamic' properties. 
// (Like what Colt was doing on event.target.name earlier in course.)

// In sizes.js we export a function that returns a string with the argument interpolated into it.

// down(size) {
//     const sizes = {
//       xs: '575.98px',
//       sm: '767.98px',
//       md: '991.98px',
//       lg: '1199.98px',
//       xl: '1600px'
//     };
 
// return `@media (max-width:${sizes[size]})`;
 
// changes to...
// 
// [sizes.down('sm')]:{
//   someStyle: 'someValue'
// }
// ...becomes
//
// @media (max-width:767.98px):{
//   someStyle: 'someValue'
// }


// This makes it easy to refer to in JSS. 
// It would be annoying having to type those media-queries all over the place. 
// It also makes it easy to change the media-queries if necessary. 
// Otherwise we'd have to search and replace across whole project.