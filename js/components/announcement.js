import { announcements } from "../data/dummy.js";

export function Announcement(){

const item=announcements[0];

return`

<section class="announcement">

<h3>${item.title}</h3>

<p>${item.content}</p>

</section>

`;

}