<h1>Celtra FE assignment</h1>

<h2>Web components for Circular Slider</h2>
<p>Complete solution consists of two web components used to create a group of circular sliders</p>

<h3>Circular slider Container</h3>
<h4>Usage</h4>
<p>Use the web component in the html file</p>

```
      <slider-container
        radius = '500'>
      </slider-container>
```
<p>Import the corresponding js file</p>

```
  <script src="js/slider-container.js"></script>
```
<h4>Configuration</h4>

<p>Configure the container by setting the following property:</p>
<p><b>radius(Required)</b>: Radius of the outer slider</p>

<h3>Circular slider</h3>
<h4>Usage</h4>
<p>Use the web component in the inside of <slider-container> element</p>

```
<slider-container radius = '500'>
        <slider-element
          max = '69'
          min = '1'
          step = '2'
          color = '#000'
        >
        </slider-element>
        <slider-element
          max = '69'
          min = '1'
          step = '2'
          color = 'green'
        >
        </slider-element>
        <slider-element
          max = '69'
          min = '1'
          step = '2'
          color = 'blue'
        >
        </slider-element>
      </slider-container>
```
<p>Import the corresponding js file</p>

```
  <script src="js/slider.js"></script>
```
<h4>Configuration</h4>

<p>Configure the slider by setting the following properties:</p>
<p><b>color(Required)</b>: Color of the slider</p>
<p><b>max(Optional)</b>: Maximum value of slider. Default: 100</p>
<p><b>min(Optional)</b>: Minimal value of slider. Default: 0</p>
<p><b>step(Optional)</b>: Slider step. Default: 1</p>
