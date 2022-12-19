# Purdue Circle
Hi! Thanks for checking out Purdue Circle. This project was created using **MongoDB, React, Node.js, and Express.js** for CS307: Software Engineering 1 at Purdue University.


## Demo Video
Here's a link to our demo: *coming soon*


## Features of app
### 1. Registering user accounts
- Each user needs to have a valid email and a unique username
- An email **cannot** be associated with two usernames
- A username **cannot** be associated with an invalid (not working) email address
- Each user has some sort of a profile containing a brief bio, a display image, and topics of their interest
- The length of the username is restricted

### 2. Authentication
- Users are able to login using a combination of their email and password
- Passwords are encrypted and **not** stored in plain text

### 3. Editing user profile
- An authenticated (logged-in) user is able to edit their own profile
- Unauthorized edits **are not** permitted (user1 cannot make edits to user2's profile)
- Invalid data (e.g., invalid email address) **is not** accepted

### 4. Delete a user account
- An authenticated (logged-in) user is able to delete their account
- All associated data is deleted too

### 5. Make posts tagged with Topics
- A logged-in user is able to make posts - text/image/url
- The length of hte post is restricted to 500 characters
- The user who creates the post (author) is able to choose a topic before posting; each post can have exactly one Topic
- A new Topic is created simply by typing the Topic name while creating the post. Once created, a Topic has no concept of moderation; anyone can choose to tag their post with it
- If a user navigates to a Topic, all posts tagged with that Topic should be displayed
- All users that follow the author of a post should eb able to see the post in their timeline
- Users should be able to post anonymously

### 6. Follow or unfollow a [User] or [Topic]
- A logged-in user (user1) is able to follow/unfollow other users (user2) which will allow user1 to see/un-see user2's posts on user1's timeline
- user1, at any time, is able to choose to follow/unfollow any topic; posts made under that topic should appear or disappear from their timeline
- If user2 makes a post on any of the topics that user1 is following, then user1 should see the post in their timeline
- If user1 does not follow a topic associated with user2's post, then user2's posts tagged with that topic **will not** show up on user1's timeline unless user1 is following user2
- user1 is able to view a list of all the users and topics they follow; from each lsit they are able to unfollow a user or topic

### 7. Show the timeline for the logged-in user
- The timeline for a logged-in user is able to see all the posts that have been posted in the topics they follow, and the posts by the users that they follow
- Recent posts are shown before older posts
- Posts are formatted in a way that displays relevant information (author's username, topic, posting time)

### 8. Engage with a post
- Logged-in user is able to engage with another user's post by:
  - Saving the post
  - Liking the post
  - Commenting on the post

### 9A. Show the profile of a selected user to any user (logged-in or not)
- The profile of a user shows their profile picture and public information
- The profile **will not** display sensitive information like email and phone number
- The profile displays a follow/unfollow button if the viewier is logged in

### 9B. Show a user's userline when we click on timeline from the profile page (only logged-in viewers)
- Recent posts are shown before older posts
- The timeline of a user has two options; first showing all the posts that they created and the second showing all the interactions they had with posts created by other people
- If user1, a user looking at user2's timeline, clicks on a post, then user1 should be taken to that post's page

### 10. Basic responsive user interface
- Client is a web-page, but can be viewed with proper formatting as Android/IOS app
- UI adheres to the following basic formatting guidelines:
  - All fields in a form need to have associated labels
  - No two fields/labels should overlap
  - Formatting of links should identify them as such
  - Images have to be properly oriented
  - Buttons/controls should be clearly visibile
  - Error messages must be displayed as HTML text instead of broswer's "alert" message
  - UI elemnts (links etc) corresponding to functionalithy that require login should not be visibile to users who are **not** logged in

### 11. Aesthetics, compatibility, and accessibility
- Supports at least two various color schemes in the UI (dark and light modes)
- Ensures compatibility of our client on mobile and desktop
- Applicatoin meets the Web Content Accessibility Guidelines Verson 2.0 defined by the World-Wide Web Consortium
- Continuous scrolling on the timeline to show all the posts
