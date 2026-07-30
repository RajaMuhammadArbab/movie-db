import styles from '../about/page.module.css';

export const metadata = {
  title: 'Contact | MovieDB',
  description: 'Get in touch with the MovieDB team.',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.heading}>Contact Us</h1>
        <div className={styles.content}>
          <p>
            Have feedback, spotted an error, or want to collaborate? We&apos;d love to hear from you.
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>

          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Your Name</label>
              <input id="name" type="text" className={styles.input} placeholder="John Doe" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input id="email" type="email" className={styles.input} placeholder="john@example.com" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea id="message" className={styles.textarea} placeholder="Write your message here..." />
            </div>
            <button type="submit" className={styles.submitBtn}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
