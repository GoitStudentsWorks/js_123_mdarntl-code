# 📌 Code Style Guide (Mandatory for the Team)

## 🎯 Purpose
We use unified rules for writing HTML, CSS, and JavaScript to ensure that the code is readable, consistent, and easy to maintain.

---

## ✅ HTML Rules

### Class Naming

Format:
sectionName-element

For nested or complex elements:
sectionName-element-subElement

Main Rule:
A class name must consist of:
section name + element role

---

### Example for the "about" section

about-title
about-text
about-list
about-list-item
about-button

---

### Common Element Naming

Text
p → sectionName-text

Headings
h1 → sectionName-title
h2 → sectionName-subtitle
h3 → sectionName-subtitle-small

Lists
ul → sectionName-list
ol → sectionName-list
li → sectionName-list-item

Containers
div → sectionName-container
div → sectionName-wrapper

Buttons and Links
button → sectionName-button
a → sectionName-link

Images and Helper Elements
img → sectionName-image
span → sectionName-label / accent / text-small

---

## ✅ CSS Rules

### Margin and Padding Order

Always follow:
top right bottom left

Example:
margin: 10px 20px 5px 15px;
padding: 10px 20px 5px 15px;

---

### Logical Property Grouping

CSS properties must be grouped logically in the following order:

1. Positioning
position
z-index
top / right / bottom / left

2. Display & Flexbox
display
flex properties
align-items
justify-content
gap

3. Box Model
width
height
margin
padding

4. Appearance
background
border
color

5. Miscellaneous
opacity
cursor
transition

---

## ✅ JavaScript Rules

### Function Usage
Use Function Declarations instead of anonymous functions when possible.

---

### Naming Conventions
Variable and function names must be:
- Clear
- Logical
- Self-explanatory

---

### Main Rule
The code must be understandable to any team member without additional explanation.

---

## ✅ Project Structure Suggestion

To improve readability and maintainability, we separate files by sections.

Examples:
artist-section-render
artist-section-main
modal-render
modal-main
feedback-render
feedback-main

After that, sections can be connected to a shared render file and main file.

---

## ✅ Naming Abbreviations Agreement

description → desc
button → btn
image → img
background → bg