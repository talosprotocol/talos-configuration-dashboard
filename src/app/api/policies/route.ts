import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { AuditEvent, JsonObject } from '@/domain/entities';

type PolicyUpdateRequest = {
  merchantId?: string;
  policyVersion?: string;
  payload?: JsonObject;
};

// In-memory audit log for prototype
const AUDIT_LOG: AuditEvent[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json() as PolicyUpdateRequest;
    const { merchantId, policyVersion, payload } = body;

    // 1. Mock AuthZ check
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer talos-')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validation (Schema Versioning Invariant)
    if (!merchantId || !policyVersion || !payload) {
      return NextResponse.json({ error: 'Missing merchant, version, or payload' }, { status: 400 });
    }

    // 3. Emit Audit Event (Production Requirement)
    const auditEvent = {
        id: uuidv4(),
        userId: 'admin-1', // Inferred from token
        action: 'POLICY_UPDATE' as const,
        entityId: merchantId,
        details: { 
            version: policyVersion, 
            prev_checksum: '...', 
            new_payload: payload 
        },
        timestamp: Date.now()
    };
    AUDIT_LOG.push(auditEvent);
    console.log(`[DASHBOARD AUDIT] ${JSON.stringify(auditEvent)}`);

    // 4. Success Response
    return NextResponse.json({ 
        success: true, 
        auditId: auditEvent.id,
        message: 'Policy update staged and audited' 
    });

  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
