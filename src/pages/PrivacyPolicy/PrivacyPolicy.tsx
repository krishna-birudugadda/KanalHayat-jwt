import styles from './PrivacyPolicy.module.scss';

import MarkdownComponent from '#src/components/MarkdownComponent/MarkdownComponent';
const PrivacyPolicy = () => {
  const markDownPage = `# PRIVACY RIGHTS

## KANAL HAYAT Online Privacy Policy

KANAL HAYAT realizes that you are concerned about how information you may give us is used and shared. In this regard, KANAL HAYAT is committed to maintaining your trust and confidence as well as to provide you with the best possible experience while visiting our website. Thus, KANAL HAYAT provides this online privacy policy to make sure you are aware of our security practices and to inform you of the way your personal information is collected, used and protected so that you will feel secure while visiting our website. By visiting our website, you are accepting our privacy policy and the practices described herein. Should you not agree, we also provide you with the opportunity to remove your personal information from our website and app.

### **What personal information KANAL HAYAT collects from you**?

The online information that we may collect includes name, address, city, state, zip, telephone number, e-mail address, and, in the case of online giving, credit card number and expiration date. In order to continuously improve your service and tailor our subsequent communications to you, we may also ask you to provide us with additional information regarding your demographics, comments, personal interests, and contact preferences. None of this information will be obtained without consent. Submitting your information expresses content.

### How KANAL HAYAT collects personal information from you?

There are 3 different ways we collect information from visitors on our Web site: 
1. From online requests for information (i.e. e-mail newsletters, contact forms, request forms, etc.); 
2. From online requests for materials from our organizations (i.e. requesting a free offer, or for prayer); 
3. From online donations and/or product purchases.

We do not receive and store any information you enter on our Web site or give us in any other way. You may choose not to provide certain information, but then you may not be able to take advantage of many of our features. We use the information you provide for such purposes as responding to your requests, improving our website, television program and other services, matching your partner information with your community profile, and communicating with you.

# 

### Cookies and Automatic Information

Cookies allow information to be retained between visits. If you click the remember me” option, it will set a log in Cookie to automatically log you in every time you visit the site. A Cookie can not read data off your hard drive or read cookie files created by other sites. Cookies do not damage your system.

Many Web sites place cookies on your hard drive. You can choose whether to accept cookies by changing the settings of your browser. Your browser can refuse all cookies, or show you when a cookie is being sent. If you choose not to accept these cookies, your experience at our site and other Web sites may be diminished and some features may not work as intended.

Examples of the information we collect and analyze include the Internet protocol (IP) address used to connect your computer to the Internet; computer and connection information such as browser type and version, operating system, and platform; the full Uniform Resource Locator (URL) clickstream to, through, and from our Web site, including date and time; cookie number; products you viewed or searched for. During some visits we may use software tools such as JavaScript to measure and collect session information, including page response times, download errors, length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs), and methods used to browse away from the page.

### How your personal information is used by KANAL HAYAT?

KANAL HAYAT uses your personal information to understand your needs and provide you with better service.

KANAL HAYAT does not and will not share your personal information

KANAL HAYAT never sells, rents, leases, or exchanges your personal information with other organizations. KANAL HAYAT assures you that the identity of all who contact us through this Web site will be kept confidential. Use of personal information will be limited to the internal purposes of KANAL HAYAT and only to further KANAL HAYAT’s activities and purposes of KANAL HAYAT. Should KANAL HAYAT be compelled by operation of law to disclose your information to law enforcement or other third parties we will notify you prior to complying with any such order.

### Security

KANAL HAYAT is committed to ensuring the security of your personal information. To prevent unauthorized access, maintain data accuracy, and ensure the proper use of information, we have established and implemented appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect online. KANAL HAYAT uses Internet Encryption Software, Secure Socket Layer (SSL) Protocol when collecting or transferring sensitive data such as credit card information. Any information you enter is encrypted at your browser, sent over the public Internet in encrypted form, then de-encrypted at our server. If we receive your credit card information, it is accessible only to a small number of trusted KANAL HAYAT staff who have been specially trained in processing this information.

### Removing your name from our data base

Our Web site provides a way to remove your name and personal information from our data base so that you do not receive any future communications from our ministry. If you desire to remove your name, use our Contact Us form.

### Modifying your personal information on our data base

If you determine that information in our database is inaccurate or it has changed, you may modify the previously provided information by using our Contact Us form.

### Changes in our Privacy Notice and Conditions

Our business changes constantly, and our Privacy Notice and the Conditions of Use will change also. You should check our Web site frequently to see recent changes. Unless stated otherwise, our current Privacy Notice applies to all information that we have about you. We stand behind the promises we make, however, and will never materially change our policies and practices to make them less protective of customer information collected in the past without the consent of affected visitors.

### Contacting Us

If you have comments or questions about our privacy policy, please use our Contact Us form.
`;
  return <MarkdownComponent className={styles.about} markdownString={markDownPage} />;
};

export default PrivacyPolicy;
