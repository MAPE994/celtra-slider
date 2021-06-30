class SliderContainer extends HTMLElement {
    constructor () {
        super();

    }

    connectedCallback() {
        //assign class variables
        this.radius = this.getAttribute('radius');
        this.sliderElements = this.querySelectorAll('slider-element');
        
        //Check required values
        this.noRadius();
        this.render();

        this.addEventListener('click', this.appendDisplay);
        this.addEventListener('drag', this.appendDisplay);
        this.addEventListener('touchmove', this.appendDisplay);
    }

    render() {
        this.renderContainer();
        this.renderSliders();
        this.appendDisplay();
    }

    renderContainer() {
        this.style.height = this.style.width = this.radius + 'px';
        this.style.display = 'inline-block';
        this.style.position = 'relative';
    }

    renderSliders() {
        let radius = this.radius;
        const numberOfElements = this.sliderElements.length,
              slot = radius / (numberOfElements * 2),
              me = this;

        this.sliderElements.forEach((element)  =>{
            const slider = element.shadowRoot.querySelector('#slider'),
                  innerSlider = element.shadowRoot.querySelector('.slider-inner');

            //group all sliders together and size them properly
            slider.classList.add("rendered");
            slider.style.width = slider.style.height = radius + 'px';
            innerSlider.style.width = innerSlider.style.height = 'calc(100% - ' + slot + 'px)';
            radius = radius - slot * 2

            me.renderSliderIndicator(element, slot);
        });
    }

    renderSliderIndicator(element, slot) {
        //match slider indicator size to slider
        let sliderIndicator = element.shadowRoot.querySelector('#slider-indicator');

        sliderIndicator.style.width = sliderIndicator.style.height = slot / 2 + 'px';
    }

    noRadius () {
        if (!this.radius) {
           this.innerText = 'Please set radius';
        }
    }

    appendDisplay () {
        //Tried to do it with attributeChangedCallback(), didn't work
        const sliders = this.sliderElements;
        let listItems = [],
            list = document.createElement('ul');

        if (this.querySelector('ul')) {
            this.removeChild(this.querySelector('ul'));
        }    

        sliders.forEach((slider) => {
            let sliderValue = slider.getAttribute('value'),
                sliderColor = slider.getAttribute('color'),
                listItemNode = document.createElement('li'),
                textNode = document.createTextNode(sliderValue); 

            listItemNode.style.backgroundColor = sliderColor;   
            listItemNode.appendChild(textNode);    

            listItems.push(listItemNode);
        });

        listItems.forEach((listItem) => {
            list.appendChild(listItem);
        });
        list.style.position = 'absolute';
        list.style.right = '0';
        list.style.listStyle = 'none';
        this.appendChild(list)
    }
}

//register custom html elements
customElements.define('slider-container', SliderContainer);