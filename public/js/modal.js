console.log('sanity check')

// <!-- js method of calling modal -->
// document.addEventListener('DOMContentLoaded', function() { 
//   let elems = document.querySelectorAll('.modal');
//   // let elems = document.getElementById('create-profile');
//   let instances = M.Modal.init(elems, options);
//   })

   // jquery method of calling modal 
   $(document).ready(function () { 
      $('.modal').modal(); 
   }) 