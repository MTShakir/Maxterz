'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TermsConditions = () => {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Terms & Conditions
              </h1>
              <p className="text-gray-600">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using the services of MAXTERZ LTD, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  MAXTERZ provides creative services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Graphics Design (logos, branding, marketing materials)</li>
                  <li>Animation & Motion Graphics</li>
                  <li>Programming & Technical Development</li>
                  <li>Video Editing and Production</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Project Process</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our standard project process includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Initial consultation and project briefing</li>
                  <li>Proposal and quotation</li>
                  <li>Contract agreement and deposit payment</li>
                  <li>Project execution with regular updates</li>
                  <li>Revisions as specified in the agreement</li>
                  <li>Final delivery upon completion of payment</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Payment terms are as follows:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>50% deposit required to commence work</li>
                  <li>Remaining 50% due upon project completion</li>
                  <li>Payment must be received before final files are delivered</li>
                  <li>Late payments may incur additional fees</li>
                  <li>All prices are in GBP unless otherwise stated</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Revisions</h2>
                <p className="text-gray-700 leading-relaxed">
                  Each project includes a specified number of revision rounds as detailed in the project agreement. Additional revisions beyond the agreed scope may incur extra charges. Revision requests must be submitted within 14 days of initial delivery.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Upon full payment:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>You receive full rights to use the final deliverables</li>
                  <li>MAXTERZ retains the right to showcase the work in our portfolio</li>
                  <li>Any third-party assets used remain property of their respective owners</li>
                  <li>MAXTERZ retains copyright of preliminary designs and concepts</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Client Responsibilities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Clients are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Providing clear project briefs and requirements</li>
                  <li>Supplying necessary materials and content in a timely manner</li>
                  <li>Responding to communications within reasonable timeframes</li>
                  <li>Ensuring they have rights to any materials they provide</li>
                  <li>Making timely payments as per the agreement</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cancellation Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Projects may be cancelled with written notice. Deposits are non-refundable. Work completed up to the point of cancellation will be charged at our standard rates. Cancellations made after 50% project completion are subject to full payment.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Confidentiality</h2>
                <p className="text-gray-700 leading-relaxed">
                  We respect the confidentiality of your project information. All client data and project details will be kept confidential and will not be shared with third parties without your explicit consent, except as required by law.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  MAXTERZ LTD shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with our services. Our total liability shall not exceed the total amount paid for the specific project in question.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms and Conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For questions about these Terms and Conditions, please contact:
                </p>
                <div className="text-gray-700 space-y-2">
                  <p><span className="font-semibold">MAXTERZ LTD</span></p>
                  <p>128 City Road, London EC1V 2NX, United Kingdom</p>
                  <p>Company No. 16822859</p>
                  <p>Email: info@maxterz.co.uk</p>
                  <p>Phone: +44 7375 874706</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;