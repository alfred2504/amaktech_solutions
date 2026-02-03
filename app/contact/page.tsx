export default function Contact() {
return (
<section>
<h2 className="text-3xl font-bold mb-4">Contact Us</h2>
<p className="mb-4">Email: inforamaiv@gmail.com | Phone: +263 716 997 735</p>


<form action="https://formsubmit.co/inforamaiv@gmail.com" method="POST" className="max-w-md space-y-4">
<input type="text" name="name" required className="w-full border p-2 rounded" placeholder="Your Name" />
<input type="email" name="email" required className="w-full border p-2 rounded" placeholder="Email" />
<textarea name="message" required className="w-full border p-2 rounded" placeholder="Message" />
<button className="bg-lime-500 text-white px-4 py-2 rounded">Send Message</button>
</form>
</section>
)
}