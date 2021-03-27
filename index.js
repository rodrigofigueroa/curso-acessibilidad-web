window.onload = () => {
  document.querySelector(".arrow-right").addEventListener("click", clickRight);
  document.querySelector(".arrow-left").addEventListener("click", clickLeft);
  document
    .querySelector(".send-button")
    .addEventListener("click", validateForm);

  document.querySelectorAll(".project").forEach(
    element => { 
      element.addEventListener("click", e => openModal(e) ); 
    });

  document.body.addEventListener("click", e => closeModal(e));
  document.body.addEventListener( 'keyup', e => listentForKey(e) )
};

/** Esta funcion se llama cuando la persona hace click en la fecha derecha del carousel para navegar a la derecha */
function clickRight() {
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".project-container")).left,
    10
  );
  if (currentLeft < -270) { //si el valor de izquierda es menor a -270, para de mover el contenido
    return;
  }
  let newValue = currentLeft - 270; //270 toma en cuenta el tamaño de la imagen mas sus margines
  document.querySelector(".project-container").style.left = `${newValue}px`;
  console.log( newValue );
  switch( newValue ){
    case -270: 
    document.querySelector( '.project1' ).setAttribute( 'tabindex', '-1' )
    document.querySelector( '.project1-container' ).setAttribute( 'aria-hidden', 'true' )
    document.querySelector( '.project4' ).removeAttribute( 'tabindex' )
    document.querySelector( '.project4-container' ).removeAttribute( 'aria-hidden' )
    return
    case -540:
      document.querySelector( '.project2' ).setAttribute( 'tabindex', '-1' )
      document.querySelector( '.project2-container' ).setAttribute( 'aria-hidden', 'true' )
      document.querySelector( '.project5' ).removeAttribute( 'tabindex' )
      document.querySelector( '.project5-container' ).removeAttribute( 'aria-hidden' )
    return
    default:
      return
  }
  
}

/** Esta funcion se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
function clickLeft() {
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".project-container")).left,
    10
  );
  if (currentLeft === 0) { //si el valor de izquiera es 0, retornar para no seguir movierno el contenido
    return;
  }
  let newValue = currentLeft + 270;
  document.querySelector(".project-container").style.left = `${newValue}px`;
  switch( currentLeft ){
    case -540: 
      document.querySelector( '.project5' ).setAttribute( 'tabindex', '-1' )
      document.querySelector( '.project5-container' ).setAttribute( 'aria-hidden', 'true' )
      document.querySelector( '.project2' ).removeAttribute( 'tabindex' )
      document.querySelector( '.project2-container' ).removeAttribute( 'aria-hidden' )
    return
    case -270:
      document.querySelector( '.project4' ).setAttribute( 'tabindex', '-1' )
      document.querySelector( '.project4-container' ).setAttribute( 'aria-hidden', 'true' )
      document.querySelector( '.project1' ).removeAttribute( 'tabindex' )
      document.querySelector( '.project1-container' ).removeAttribute( 'aria-hidden' )
    return
    default:
      return
  }
}

/** Esta funcion se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
function showNotification() {
  document.querySelector(".notification").style.display = "flex";
  setTimeout(function() {
    document.querySelector(".notification").style.display = "none";
  }, 3000);
}

/** Esta funcion se llama cuando la persona hace click en cualquier porjecto del carousel */
function openModal(e) {
  const url = e.target.localName === 'button' 
    ? e.target.firstElementChild.src
    : e.target.src
  document.querySelector(".modal-container").style.display = "flex";
  document.querySelector('.modal-project-image').style.cssText = `
    background: center / cover no-repeat url('${ url }');
  `
  document.querySelector( '.modal-cerrar' ).focus()
  e.stopPropagation()
}

function listentForKey(e){
  e.key === 'Escape' ? closeModal(e) : null
}

/** Esta funcion se llama para cerrar el modal */
function closeModal(e) {
  // si el click occurio dentro del las imagenes del carousel o dentro del modal, no se cierra el modal
  console.log(e.target);
  if (
    e.target.className.includes("project") ||
    e.target.className === "modal"
  ) {
    return;
  } else {
    document.querySelector(".modal-container").style.display = "none";
  }
}

function validateForm(e){
    e.preventDefault()
  const form      = document.querySelector('form'),
        regex     = {
          name_user: /^([a-z]|[A-Z]| )+$/,
          email: /^(.+)@(.+)(.+)$/,
          message: /^(.)+$/
        },
        errorData = {
          name_user: 'Ingresa un Nombre valido',
          email: 'Ingresa un email valido',
          message: 'Ingresa un Mensaje valido'
        },
        stillForm = {
          name_user: false,
          email: false,
          message: false
        }
      form.querySelectorAll( 'input' )
        .forEach( input => {
        const error   = validateEachInput( input.value, regex[ input.name ] ),
                span  = input.parentNode.querySelector('span')
        if( !error ){
          span.innerHTML = errorData[ input.name ]
        }else{
          stillForm[ input.name ] = true
          span.innerHTML = ''
        }
      })
      for( check in stillForm ){
        if( !stillForm[ check ] ){
          return
        }
      }
      form.reset()
      showNotification()
}

const validateEachInput = ( value, regex ) => regex.test( value ) 