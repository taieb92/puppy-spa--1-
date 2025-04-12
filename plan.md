# Puppy Spa Frontend Development Plan (Next.js)

## Week 1: Project Setup & Foundation

### Day 1: Initial Setup
- [ ] Install Node.js
- [ ] Create Next.js project: `npx create-next-app@latest puppy-spa-frontend`
- [ ] Set up folder structure
  - `/components` - Reusable UI components
  - `/pages` - Next.js pages
  - `/services` - API service layer
  - `/styles` - CSS/styling files
  - `/utils` - Helper functions
  - `/contexts` - React context files
- [ ] Install dependencies:
  ```
  npm install axios react-datepicker react-beautiful-dnd react-icons date-fns
  ```
- [ ] Set up pet-themed styling:
  - [ ] Create color scheme with playful, pet-friendly colors:
    - Primary: `#FF9671` (Warm Orange/Salmon - like a puppy's nose)
    - Secondary: `#845EC2` (Purple - playful and fun)
    - Accent: `#00C9A7` (Teal - clean and fresh)
    - Background: `#FEF6EB` (Soft cream - like puppy fur)
    - Text: `#4B4453` (Soft black - gentle on the eyes)
  - [ ] Add pet-themed icons and illustrations
  - [ ] Create a playful logo with a puppy silhouette

### Day 2: API Service Layer
- [ ] Create Axios instance with base URL in `/services/api.js`
- [ ] Create waiting list API service methods:
  - `createWaitingList(date)`
  - `getWaitingLists(page, limit)`
  - `getWaitingListByDate(date)`
- [ ] Create waiting list entry API service methods:
  - `createEntry(listId, entryData)`
  - `getEntries(listId, status)`
  - `updateEntryStatus(listId, entryId, status)`
  - `updateEntryPosition(listId, entryId, position)`
- [ ] Create search API service method:
  - `searchEntries(query)`

### Day 3: State Management & Layout
- [ ] Create Context for app state in `/contexts/AppContext.js`
- [ ] Set up global state for:
  - Current waiting list
  - List entries
  - Loading states
  - Error states
- [ ] Create pet-themed layout component with header in `/components/Layout.js`
  - Include paw print navigation icons
  - Add playful puppy illustrations in header
  - Use rounded corners and soft shadows for a friendly feel
- [ ] Create loading animation with bouncing puppy silhouette
- [ ] Create error components with sad puppy illustrations

## Week 2: Core Features Implementation

### Day 4: Homepage / Today's List
- [ ] Create homepage in `/pages/index.js` with large, friendly UI
- [ ] Implement logic to:
  - Check if a list exists for today
  - Create a new list if needed (with big, obvious button)
  - Fetch entries for today's list
- [ ] Create WaitingListDisplay component in `/components/WaitingListDisplay.js`
  - Display entries as simple, large cards (not a complex table)
  - Use paw print bullets or icons for position numbers
  - Show status with clear visual indicators (bone icon for waiting, checkmark for serviced)
  - Big, readable fonts for receptionist ease-of-use

### Day 5: Add New Entry & Status Toggle
- [ ] Create NewEntryForm component in `/components/NewEntryForm.js`
  - Simple, large form fields: owner name, puppy name, service required
  - Minimal validation (required fields only)
  - Large, obvious "Add Puppy" button with paw icon
  - Pet-themed input styling
- [ ] Implement status toggling with large, touch-friendly buttons
  - Add big checkbox or toggle button to mark as serviced
  - Show clear visual feedback when status changes
  - Add subtle animation when status changes

### Day 6: List Reordering
- [ ] Add large, touch-friendly position controls
  - Big up/down buttons with clear icons
  - Simple drag-and-drop functionality with visual feedback
  - Ensure buttons are easy to tap on a tablet
- [ ] Implement clear visual hierarchy:
  - Next puppy to be served has highlighted card or border
  - Serviced puppies are visibly different (grayed out or moved to separate section)
  - Use color coding for easy scanning

## Week 3: Secondary Features & Refinement

### Day 7: Previous Days View
- [ ] Create previous days page in `/pages/previous-days.js`
- [ ] Implement pet-themed calendar component
  - Use dog bone or paw print markers for dates with entries
  - Make calendar large and easy to tap on tablets
- [ ] Add simple navigation buttons (previous/next day)
- [ ] Show selected day's waiting list with same pet-friendly design as homepage

### Day 8: Search Implementation
- [ ] Create search page in `/pages/search.js` with simple design
- [ ] Implement large, prominent search form:
  - Big input field with clear placeholder text
  - Cute magnifying glass icon with paw print
  - Minimal UI complexity
- [ ] Create SearchResults component
  - Display matching entries as simple cards
  - Use same pet-themed styling as main list
  - Clear indication of which day the record is from

### Day 9: Responsive Design
- [ ] Ensure UI works well on:
  - Desktop monitors
  - Tablets (primary target - optimize especially for this)
  - Mobile phones
- [ ] Implement touch-friendly design throughout:
  - Large tap targets (min 48px)
  - Simplified navigation for smaller screens
  - No hover-dependent features

## Week 4: Polish & Deployment

### Day 10: Pet-Themed UI Polish
- [ ] Add playful pet illustrations:
  - Empty state illustrations (puppy with "No puppies waiting" message)
  - Success animations (happy dog when marking as serviced)
  - Loading states (puppy chasing tail)
- [ ] Add subtle pet-themed patterns to backgrounds
- [ ] Use playful animations:
  - Wagging tail cursors on hovering over buttons
  - Paw print loading indicators

### Day 11: Error Handling & User Feedback
- [ ] Implement pet-themed toast notifications:
  - Success messages with happy puppy icon
  - Errors with apologetic puppy illustration
  - Simple, friendly language in all messages
- [ ] Add visual feedback for all interactions
- [ ] Keep validation extremely simple and clear

### Day 12: Final Testing & Deployment
- [ ] Test with actual receptionists if possible
- [ ] Optimize for simplicity and speed
- [ ] Final bug fixes
- [ ] Deploy to Vercel or similar hosting service

## UI Components Breakdown

### Core Components
1. **PuppySpaLayout** - Main pet-themed layout wrapper with navigation
2. **PuppyList** - Displays entries as simple, friendly cards
3. **AddPuppyForm** - Simple form to add new puppies to the list
4. **PuppyCalendar** - For navigating between different days
5. **PuppySearch** - Simple search functionality
6. **PuppyCard** - Individual puppy entry display
7. **ServiceToggle** - Big, obvious UI element to mark entries as serviced
8. **PuppyOrderControls** - Simple, large UI for reordering entries

### Pages
1. **Home/Today** (`/`) - Shows today's list, option to create new day
2. **Previous Days** (`/previous-days`) - Simple calendar to access past lists
3. **Search** (`/search`) - Basic search functionality

## Design Guidelines

### Colors
- Primary: `#FF9671` (Warm Orange/Salmon - like a puppy's nose)
- Secondary: `#845EC2` (Purple - playful and fun)
- Accent: `#00C9A7` (Teal - clean and fresh)
- Background: `#FEF6EB` (Soft cream - like puppy fur)
- Text: `#4B4453` (Soft black - gentle on the eyes)

### Typography
- Primary Font: 'Quicksand' or other rounded, friendly sans-serif
- Headings: 28px/24px/20px - larger than normal for clarity
- Body: 18px - slightly larger for better readability
- Button text: 18px bold - very clear and readable

### Layout
- Maximum width: 1000px (simpler, less overwhelming)
- Card padding: 20px (more white space for clarity)
- Button size: 56px height (extra large for easy touch targets)
- Spacing: Generous margins and padding throughout

## Best Practices
- Use Next.js Image component for optimized images
- Keep the interface extremely simple - fewer options are better
- Use large, obvious buttons with clear purposes
- Make touch targets large and well-spaced for easy tablet use
- Minimize the number of steps needed for common tasks
- Use clear, simple language in all UI text
- Provide immediate visual feedback for all actions
- Optimize the app for speed and responsiveness
- Use pet-themed illustrations to make the app friendly and engaging
- Avoid complex features that aren't explicitly required
- Remember that the receptionist may be busy and distracted while using the app