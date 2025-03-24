<?php
// Start session to manage admin login if needed
session_start();

// Check if the user is logged in as admin (this is just a basic check)
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php'); // Redirect to login page if not logged in
    exit();
}

// Define file paths for content storage (you can use a database as well)
$aboutFile = 'content/about.txt';
$planningFile = 'content/planning.txt';
$contactFile = 'content/contact.txt';

// Function to update content in respective files
function updateContent($file, $newContent) {
    // Write the new content to the file
    file_put_contents($file, $newContent);
}

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contentType = $_POST['content-type'];
    $newContent = $_POST['new-content'];

    // Update content based on selected section
    if ($contentType === 'about') {
        updateContent($aboutFile, $newContent);
        $message = "About section updated!";
    } elseif ($contentType === 'planning') {
        updateContent($planningFile, $newContent);
        $message = "Planning section updated!";
    } elseif ($contentType === 'contact') {
        updateContent($contactFile, $newContent);
        $message = "Contact information updated!";
    } else {
        $message = "Invalid content type selected.";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ridiyagama Safari Park - Admin</title>
  <link rel="stylesheet" href="home4.css">
</head>
<body>
  <div class="container" id="main-container">
    <img src="logo.png" alt="Tiger" width="150px" height="100px" id="logo">
    <header class="header" id="header">
      <nav class="nav" id="navbar">
        <ul id="nav-list">
          <li id="nav-home"><a href="home4.php">Home</a></li>
          <li id="nav-map"><a href="map.php">Map</a></li>
          <li id="nav-gallery"><a href="gallery.php">Gallery</a></li>
          <li id="nav-events"><a href="event.php">Events</a></li>
          <li id="nav-info"><a href="information.php">Information</a></li>
          <li id="nav-help"><a href="help.php">Help</a></li>
          <li id="nav-logout"><a href="logout.php" class="logout-btn">Logout</a></li>
        </ul>
      </nav>
    </header>

    <main id="main-content">
      <h1>Admin Dashboard</h1>

      <!-- Display success or error message -->
      <?php if (isset($message)) { echo "<p>$message</p>"; } ?>

      <!-- Form for inserting, updating, or deleting content -->
      <form action="admin_home.php" method="POST" id="admin-form">
        <label for="content-type">Select Content Type:</label>
        <select name="content-type" id="content-type">
          <option value="about">About Section</option>
          <option value="planning">Planning Section</option>
          <option value="contact">Contact Information</option>
        </select><br><br>

        <label for="new-content">New Content:</label><br>
        <textarea name="new-content" id="new-content" rows="5" cols="50"><?php
          // Preload content from the respective file if it's an update
          if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['edit'])) {
              $editContent = '';
              switch ($_GET['edit']) {
                  case 'about':
                      $editContent = file_get_contents($aboutFile);
                      break;
                  case 'planning':
                      $editContent = file_get_contents($planningFile);
                      break;
                  case 'contact':
                      $editContent = file_get_contents($contactFile);
                      break;
              }
              echo htmlspecialchars($editContent);
          }
        ?></textarea><br><br>

        <button type="submit">Update Content</button>
      </form>

    </main>
  </div>
</body>
</html>
