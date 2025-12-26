# User Registration Form

A modern, responsive user registration form built with pure HTML, CSS, and JavaScript. Features real-time validation, pixel-perfect design matching, and an intuitive user experience.

## 🚀 Features

- **Real-time Validation**: Instant feedback as users type
- **Comprehensive Field Validation**:
  - Username: 3-15 characters, alphanumeric only
  - Full Name: Letters and spaces only, must contain first and last name
  - Email: Standard email format validation
  - Password: Minimum 8 characters, must include number or symbol, cannot contain name or email
- **Visual Feedback**: Color-coded input states (error/success)
- **Password Toggle**: Show/hide password functionality
- **Smart Submit Button**: Enabled only when all fields are valid
- **Success Animation**: Smooth success message on form submission
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Keyboard navigation support and ARIA labels

## 📋 Project Structure

```
hajamin/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling and responsive design
├── js/
│   └── script.js        # Validation logic and form handling
├── assets/             # Images and icons
│   ├── frame.svg
│   └── sidebarbg.jpg
├── figma/              # Design reference images
└── README.md           # Project documentation
```

## 🛠 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, flexbox, and animations
- **Vanilla JavaScript (ES6+)**: No frameworks or libraries
- **Google Fonts**: Figtree font family

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd hajamin
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the application**:
   - Navigate to `http://localhost:8000` in your browser

## 🎨 Design

The form design matches the Figma specifications pixel-perfect, including:
- Sidebar with background image
- Clean, modern form layout
- Proper spacing and typography
- Interactive states (hover, focus, error, success)
- Responsive breakpoints

## ✅ Validation Rules

### Username
- Length: 3-15 characters
- Characters: Alphanumeric only (letters and numbers)
- Error messages displayed for invalid input

### Full Name
- Characters: Letters and spaces only
- Format: Must contain at least first and last name (2+ words)
- Error messages displayed for invalid input

### Email
- Format: Standard email format (example@domain.com)
- Validated using regex pattern
- Error message for invalid format

### Password
- Minimum 8 characters
- Must include at least one number OR one symbol
- Cannot contain the user's name (from Full Name field)
- Cannot contain any part of the email address
- Comprehensive error messages for each validation failure

## 🎯 User Experience

- **Real-time Feedback**: Validation occurs as users type
- **Clear Error Messages**: Specific, helpful error messages below each field
- **Visual Indicators**: Green borders for valid fields, red for errors
- **Disabled Submit**: Button is disabled until all fields are valid
- **Success State**: Animated success message on successful submission
- **Form Reset**: Form clears automatically after successful submission

## 📱 Responsive Design

The form is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Form Submission

On successful submission:
1. Form data is logged to the browser console (password is masked)
2. Success message is displayed
3. Form is automatically cleared after 1.5 seconds
4. Submit button returns to disabled state

## 🚀 Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop or connect repository
- **GitHub Pages**: Enable in repository settings
- **Render**: Connect repository and deploy

### Live Demo
[Add your live deployment URL here]

## 📸 Screenshots

[Add screenshots or GIF demos here]

## 🧪 Testing

Test the form with various scenarios:
- Valid inputs for all fields
- Invalid username formats
- Invalid email formats
- Weak passwords
- Passwords containing name or email
- Empty fields
- Edge cases

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as part of a web development workshop project.

---

**Note**: This form does not store or send data to any server. All validation is client-side only, and form data is logged to the browser console for demonstration purposes.
