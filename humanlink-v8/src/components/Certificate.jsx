import { forwardRef } from 'react';

const Certificate = forwardRef(({ volunteerName, achievement }, ref) => {
  const formattedDate = new Date(achievement.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div
      ref={ref}
      style={{
        width: '900px',
        minHeight: '636px',
        background: '#ffffff',
        position: 'relative',
        fontFamily: 'Georgia, "Times New Roman", serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 72px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Outer border */}
      <div style={{
        position: 'absolute', inset: '18px',
        border: '2px solid #c8a96e',
        borderRadius: '10px',
        pointerEvents: 'none',
      }} />
      {/* Inner border */}
      <div style={{
        position: 'absolute', inset: '26px',
        border: '1px solid #e8d5a8',
        borderRadius: '6px',
        pointerEvents: 'none',
      }} />

      {/* Corner ornaments */}
      {[
        { top: 26, left: 26, borderTop: '3px solid #c8a96e', borderLeft: '3px solid #c8a96e', borderRight: 'none', borderBottom: 'none' },
        { top: 26, right: 26, borderTop: '3px solid #c8a96e', borderRight: '3px solid #c8a96e', borderLeft: 'none', borderBottom: 'none' },
        { bottom: 26, left: 26, borderBottom: '3px solid #c8a96e', borderLeft: '3px solid #c8a96e', borderRight: 'none', borderTop: 'none' },
        { bottom: 26, right: 26, borderBottom: '3px solid #c8a96e', borderRight: '3px solid #c8a96e', borderLeft: 'none', borderTop: 'none' },
      ].map((style, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 32, height: 32,
          borderRadius: 2,
          ...style,
        }} />
      ))}

      {/* Watermark ring */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 320, height: 320,
        borderRadius: '50%',
        border: '60px solid #f0e8d0',
        opacity: 0.18,
        pointerEvents: 'none',
      }} />

      {/* Subtle gradient corners */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,169,110,0.08), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -80,
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,58,138,0.06), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <img
          src="/logo-icon.jpeg"
          alt="HumaLink"
          style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 10, border: '1.5px solid #e8d5a8' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1e3a8a', fontFamily: 'Georgia, serif', letterSpacing: 2 }}>
            HumaLink
          </div>
          <div style={{ fontSize: 9, color: '#9ca3af', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'Arial, sans-serif', marginTop: 2 }}>
            Volunteer Platform
          </div>
        </div>
      </div>

      {/* CERTIFICATE title */}
      <div style={{ fontSize: 13, letterSpacing: 6, textTransform: 'uppercase', color: '#c8a96e', fontFamily: 'Arial, sans-serif', fontWeight: 600, marginBottom: 10 }}>
        Certificate of Achievement
      </div>

      {/* Top ornamental divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '65%', marginBottom: 28 }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #c8a96e80)' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8a96e', opacity: 0.6 }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8a96e' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8a96e', opacity: 0.6 }} />
        </div>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #c8a96e80)' }} />
      </div>

      {/* Presented to */}
      <div style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic', marginBottom: 12, fontFamily: 'Georgia, serif', letterSpacing: 0.5 }}>
        This certificate is proudly awarded to
      </div>

      {/* Volunteer Name — BIGGEST */}
      <div style={{
        fontSize: 46, fontWeight: 700, color: '#1e3a8a',
        marginBottom: 16, textAlign: 'center',
        fontFamily: 'Georgia, "Times New Roman", serif',
        letterSpacing: 1.5, lineHeight: 1.1,
      }}>
        {volunteerName}
      </div>

      <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic', marginBottom: 10, fontFamily: 'Georgia, serif' }}>
        in recognition of outstanding contribution to
      </div>

      {/* Achievement Title */}
      <div style={{ fontSize: 22, fontWeight: 700, color: '#1e3a8a', marginBottom: 6, textAlign: 'center', fontFamily: 'Georgia, serif', letterSpacing: 0.5 }}>
        {achievement.title}
      </div>

      {/* Organization */}
      <div style={{ fontSize: 13, color: '#c8a96e', fontFamily: 'Arial, sans-serif', marginBottom: 28, letterSpacing: 0.5 }}>
        {achievement.organization}
      </div>

      {/* Mid divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '50%', marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #1e3a8a30)' }} />
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#1e3a8a', opacity: 0.3 }} />
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #1e3a8a30)' }} />
      </div>

      {/* Details row */}
      <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginBottom: 36 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 2.5, fontFamily: 'Arial, sans-serif', marginBottom: 6 }}>Date Awarded</div>
          <div style={{ fontSize: 14, color: '#1e3a8a', fontWeight: 600, fontFamily: 'Georgia, serif' }}>{formattedDate}</div>
        </div>
        {achievement.hours && (
          <>
            <div style={{ width: 1, background: '#e8d5a8', alignSelf: 'stretch' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 2.5, fontFamily: 'Arial, sans-serif', marginBottom: 6 }}>Hours Volunteered</div>
              <div style={{ fontSize: 14, color: '#1e3a8a', fontWeight: 600, fontFamily: 'Georgia, serif' }}>{achievement.hours} Hours</div>
            </div>
          </>
        )}
        {achievement.impact && achievement.impact !== 'Ongoing' && (
          <>
            <div style={{ width: 1, background: '#e8d5a8', alignSelf: 'stretch' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 2.5, fontFamily: 'Arial, sans-serif', marginBottom: 6 }}>Impact</div>
              <div style={{ fontSize: 14, color: '#1e3a8a', fontWeight: 600, fontFamily: 'Georgia, serif' }}>{achievement.impact}</div>
            </div>
          </>
        )}
      </div>

      {/* Signature */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 140, height: 1, background: '#1e3a8a40', margin: '0 auto 8px' }} />
        <div style={{ fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 2, fontFamily: 'Arial, sans-serif' }}>
          Authorized Signature
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'Georgia, serif', marginTop: 3, fontStyle: 'italic' }}>
          HumaLink
        </div>
      </div>
    </div>
  );
});

Certificate.displayName = 'Certificate';
export default Certificate;
