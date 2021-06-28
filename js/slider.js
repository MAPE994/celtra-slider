//assign template
let template = document.getElementById('slider-element');
let templateContent = template.content;

class Slider extends HTMLElement {

    constructor () {
        super();

        //initiate shadow DOM and append template 
        const shadowRoot = this.attachShadow({mode: 'open'})
          .appendChild(templateContent.cloneNode(true));
  
    }

    connectedCallback() {

        //assign class variables
        this.currentAngle = 0;
        this.max = this.getAttribute('max') ? this.getAttribute('max') : 0;
        this.min = this.getAttribute('min') ? this.getAttribute('min') : 0;
        this.step = this.getAttribute('step') ? this.getAttribute('step') : 1;
        this.color = this.getAttribute('color');
        this.value = this.getAttribute('value');
        this.slider = this.shadowRoot.querySelector('#slider')

        //render slider
        this.renderSlider();

        //add event listeners
        this.addEventListener('click', this.calculateAngleInDeg);
        this.addEventListener('click', this.setSliderIndicator);
        this.addEventListener('drag', this.calculateAngleInDeg);
        this.addEventListener('drag', this.setSliderIndicator);
        this.addEventListener('mouseup', this.calculateAngleInDeg);
        this.addEventListener('mouseup', this.setSliderIndicator);
    }

    renderSlider() {
        this.setSliderIndicator();
        this.setBgColor();
        this.drawBackground(this.slider, this.currentAngle);
    }

    calculateAngleInDeg(event) {
        let element = this.slider,
            widthCenter = element.offsetWidth / 2,
            heightCenter = element.offsetHeight / 2,

            startPositionHorizontal = this.getOffset(element).left + widthCenter,
            startPositionVertical= this.getOffset(element).top + heightCenter,

            endPositionHorizontal = event.clientX,
            endPositionVertical = event.clientY,

            angleRad = Math.atan2(endPositionVertical - startPositionVertical, endPositionHorizontal - startPositionHorizontal),
            angleDeg  = angleRad * (180 / Math.PI) + 90;
            
        if (angleDeg <= 0) {
            angleDeg += 360;
        }

        this.currentAngle = this.applyStep(angleDeg);

        this.value = this.calculateValue(this.currentAngle);

        this.drawBackground(element, this.currentAngle);
    }

    drawBackground(element, angleDeg) {
        if (angleDeg <= 180) {
            element.style.backgroundImage ='linear-gradient(' + (90 + angleDeg) + 'deg, transparent 50%, #fff 50%), linear-gradient(90deg, #fff 50%, transparent 50%)';
        }
        else {
            element.style.backgroundImage ='linear-gradient(' + (angleDeg - 90) + 'deg, #fff 50%, transparent 50%), linear-gradient(90deg,'+ this.color +' 50%, transparent 50%)';
        }
    }

    getOffset(element) {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top
        };
    }

    applyStep(angleDeg) {
        const increment = angleDeg / this.step,
               rounded = Math.ceil(increment);

        return rounded * this.step
    }

    calculateValue (angleDeg) {
        const range = this.max - this.min,
              value = Math.ceil((range * angleDeg) / 360);

        this.setAttribute("value", value);
        
        return value
    }

    setSliderIndicator() {
        let indicatorContainer = this.shadowRoot.querySelector('#slider-indicator-container'),
            angleDeg = this.currentAngle

        indicatorContainer.style.transform = 'translate(-50%, -50%) rotate(' + angleDeg + 'deg)' ;

    }

    setBgColor() {
        const element = this.shadowRoot.querySelector('#slider');

        element.style.backgroundColor = this.color;
    }
}

customElements.define('slider-element', Slider);


