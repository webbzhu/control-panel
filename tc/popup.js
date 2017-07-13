/* Designed to be used for all pop-up window functionality.
 * @param win_url
 *      URL of the page to be loaded in the pop-up window.
 * @param win_name
 *      Name of the pop-up window.
 * @param win_height
 *      Height of the pop-up window in pixels.
 * @param win_width
 *      Width of the pop-up window in pixels.
 * @param win_id
 *      ID of the pop-up window. Use an empty String if no id is needed.
 * @param no_reload
 *      If true, subsequent clicks don't reload the page.
 */
function popup(win_url, win_name, win_height, win_width, win_id, no_reload) {
 /* Error Checking */
 win_id = win_id || ""; // if win_id is null, empty, etc., win_id = "";
 win_url = win_url || "";
 win_name = win_name || "default_popup";
 win_height = win_height || "600";
 win_width = win_width || "500";
 no_reload = no_reload || false;

 var url = no_reload ? "" : win_url;
 var win = window.open(url, win_name + win_id, "height=" + win_height
  + ",width=" + win_width + ",scrollbars=yes,resizable=yes");

 if (no_reload
     && (win.closed || (!win.document.URL) || (win.document.URL.indexOf("about") == 0))) {
  win.location = url;
 }

 if (window.focus) {
  win.focus();
 }

 if (no_reload) {
  return false;
 }
}