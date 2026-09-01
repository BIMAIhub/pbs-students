import { pbsAdminStore } from './pbsAdminStore';

export const upiPaymentModule = {
  /**
   * Simulates opening a UPI app, generating a UTR, and waiting for confirmation.
   * Resolves when the payment simulation is complete.
   */
  simulateUpiIntent: async (
    amount: number,
    payeeUpi: string,
    appName: string = 'UPI App'
  ): Promise<{ success: boolean; transactionId: string; status: string }> => {
    return new Promise((resolve) => {
      // Simulate real-time validation delay
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `${appName.replace(/\s/g, '').substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-8)}`,
          status: 'SUCCESS'
        });
      }, 2500); 
    });
  },

  /**
   * Complete mock integration that triggers intent and directly stores 
   * the successful enrollment & transaction status in the profile data.
   */
  processEnrollmentViaUpi: async (data: {
    studentId?: string;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    courseId: string;
    courseTitle: string;
    totalFee: number;
    amountPaid: number;
    pendingBalance: number;
    paymentPlan: 'Full Payment' | 'Part Payment (50%)';
    upiApp: string;
  }) => {
    // 1. Mock intent
    const intentResult = await upiPaymentModule.simulateUpiIntent(
      data.amountPaid, 
      'pravinsyadavpsy99-03@oksbi', 
      data.upiApp
    );

    // 2. Submit Enrollment Request
    const req = pbsAdminStore.submitEnrollmentRequest({
      studentId: data.studentId,
      studentName: data.studentName,
      studentEmail: data.studentEmail,
      studentPhone: data.studentPhone,
      courseId: data.courseId,
      courseTitle: data.courseTitle,
      totalFee: data.totalFee,
      amountPaid: data.amountPaid,
      pendingBalance: data.pendingBalance,
      paymentPlan: data.paymentPlan,
      paymentMethod: 'UPI',
      upiId: 'pravinsyadavpsy99-03@oksbi',
      transactionId: intentResult.transactionId,
      screenshotUrl: 'Auto-verified via UPI Intent'
    });

    // 3. Auto-approve to simulate successful enrollment and store status
    const approval = pbsAdminStore.approveEnrollmentRequest(req.id, 'UPI Automated System');

    return {
      success: true,
      transactionId: intentResult.transactionId,
      requestDetails: req,
      studentData: approval.student
    };
  }
};
