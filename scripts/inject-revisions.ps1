# Injects net-new content from the live L design into copies of each
# original .docx in NEW/. The original document keeps its exact format
# (we copy bit-for-bit and let Word edit in place); only the added lines
# and a one-line "Why:" justification are inserted in purple at the
# correct anchor point in the doc.
#
# Output goes to NEW/Revised/. Originals in NEW/ are never modified.

$ErrorActionPreference = 'Stop'

$NEW_DIR = 'C:\Users\Shehnaz3110\Dropbox\ARTICLE TEMPLATES\SAAS TOOLS\LOGO AI\PRE-LAUNCH\CONTENT\NEW'
$REV_DIR = Join-Path $NEW_DIR 'Revised'

# Purple Heart #7543E3 -> Word's Font.Color uses BGR-packed integer.
# B=0xE3, G=0x43, R=0x75 -> 0xE34375 = 14893941
$PURPLE = 14893941

# wd*-style enum values that PowerShell can't auto-resolve from $word.WdSomething:
$wdCollapseStart = 1
$wdCollapseEnd   = 0
# wdFormatXMLDocument = 16 (used for SaveAs of legacy .doc -> .docx)
$wdFormatDocx = 16

# Each task = one source doc + one or more anchored insertions.
# An insertion = { Anchor, Where (Before|After), Lines (string[]), Why (string) }.
$tasks = @(
    @{
        Source = 'LEADERSHIP.docx'
        Output = 'LEADERSHIP - REVISED.docx'
        Insertions = @(
            @{
                Anchor = 'Abhinav Reddy'
                Where  = 'Before'
                Lines  = @('Our founders', 'Two brothers. One conviction.')
                Why    = "Section eyebrow + heading added on the live site to introduce the founder cards. Every other sub-page section opens with an eyebrow + h2 pair to keep visual hierarchy consistent across the site; the original copy here had only the cards, so the section felt orphaned. The h2 phrasing is lifted from the existing closing tagline at the bottom of this doc."
            }
        )
    },
    @{
        Source = 'HOW It WORKS.docx'
        Output = 'HOW IT WORKS - REVISED.docx'
        Insertions = @(
            @{
                Anchor = 'Step 01 - Describe your brand'  # em-dash variant; we also try plain hyphen
                AnchorAlt = 'Step 01'
                Where  = 'Before'
                Lines  = @('The walkthrough', 'Three steps. Sixty seconds.')
                Why    = "Wrapping eyebrow + h2 added so the three numbered steps render as ONE walkthrough on the live site. Without a parent header, each step rendered as its own LSection with alternating background, which made the three steps look like three separate sections instead of one continuous flow."
            }
        )
    },
    @{
        Source = 'WHY LOGO AI.doc'
        IsLegacyDoc = $true
        Output = 'WHY LOGO AI - REVISED.docx'
        Insertions = @(
            @{
                Anchor = "Describe your brand. Get a studio-quality logo in 60 seconds. Completely free."
                Where  = 'After'
                Lines  = @(
                    'See it in action',
                    'Watch LOGO.AI design a brand in 60 seconds.',
                    '[16:9 video player placeholder]',
                    'Video coming soon',
                    'One input. Sixty seconds. A finished logo.'
                )
                Why    = "Video placeholder section added between the hero and the differentiators. Stakeholders requested a visual demo on this page; this copy reserves the slot in the layout until the real video is produced."
            },
            @{
                Anchor = "It's faster than anything out there"
                Where  = 'Before'
                Lines  = @('What sets us apart', 'Five reasons LOGO.AI is different.')
                Why    = "Umbrella eyebrow + heading added to bind the five numbered differentiators into one continuous block. The original docx flows from one numbered point to the next without a parent label; on the live site that made each item look like its own standalone section."
            }
        )
    },
    @{
        Source = 'CONTACT.docx'
        Output = 'CONTACT - REVISED.docx'
        Insertions = @(
            @{
                Anchor = 'General questions'
                Where  = 'Before'
                Lines  = @('How to reach us', 'Pick the channel that fits.')
                Why    = "Section header added so the contact-methods grid follows the same eyebrow + h2 pattern used on every other sub-page section. Original copy goes straight from the page intro into the first contact channel, which broke the design pattern."
            },
            @{
                Anchor = "Can't find what you need"
                Where  = 'Before'
                Lines  = @('Still stuck?', "We're here to help.")
                Why    = "Closing-note section gained a header. Without it, the 'Can't find what you need?' line rendered as an orphan paragraph below the contact-methods grid; this header makes it a proper closing section."
            }
        )
    }
)

# Prepare folders
New-Item -ItemType Directory -Force -Path $REV_DIR | Out-Null

# Make sure no Word instance is locking the destination files
Get-Process WINWORD -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Milliseconds 500

# Single Word instance for the whole batch
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0  # wdAlertsNone

function Open-And-CopyToRevised {
    param([string]$src, [string]$dst, [bool]$isLegacy)

    Copy-Item -Path $src -Destination $dst -Force

    if ($isLegacy) {
        # The legacy .doc was copied verbatim; reopen and SaveAs .docx in place.
        # Trick: copy the .doc to a temp .doc path, save-as .docx to $dst.
        Remove-Item $dst -Force
        $tmpDoc = Join-Path $env:TEMP ([System.IO.Path]::GetFileName($src))
        Copy-Item -Path $src -Destination $tmpDoc -Force
        $tmpDocObj = $word.Documents.Open($tmpDoc)
        $tmpDocObj.SaveAs([ref]$dst, [ref]$wdFormatDocx)
        $tmpDocObj.Close()
        Remove-Item $tmpDoc -Force -ErrorAction SilentlyContinue
    }

    return $word.Documents.Open($dst)
}

function Find-Anchor-Range {
    param($doc, $anchorText, $anchorAlt)

    foreach ($try in @($anchorText, $anchorAlt) | Where-Object { $_ -ne $null -and $_ -ne '' }) {
        $find = $doc.Content.Find
        $find.ClearFormatting()
        $find.Text = $try
        $find.Forward = $true
        $find.MatchCase = $false
        $find.Wrap = 1  # wdFindContinue
        $found = $find.Execute()
        if ($found) {
            return $find.Parent.Duplicate
        }
    }
    return $null
}

function Inject-At-Anchor {
    param($doc, $anchorRange, $where, $lines, $why)

    if ($where -eq 'Before') {
        # Get start of paragraph containing the anchor; insert before it.
        $para = $anchorRange.Paragraphs.Item(1).Range
        $insertPoint = $para.Start
    } else {
        # Get end of paragraph containing the anchor; insert after it.
        $para = $anchorRange.Paragraphs.Item(1).Range
        # paragraph end includes the trailing paragraph mark; insert AT the end
        $insertPoint = $para.End
    }

    # Build the payload as one string with paragraph marks between lines.
    $payload = ''
    foreach ($line in $lines) {
        $payload += $line + "`r"
    }
    $payload += '[Why: ' + $why + ']' + "`r"

    # Insert
    $insertRange = $doc.Range($insertPoint, $insertPoint)
    $insertRange.Text = $payload
    # After assignment, $insertRange.End == insertPoint + length(payload).

    # Now apply formatting:
    # All inserted text gets purple color and bold by default; the last line
    # ([Why: ...]) gets italic and is also purple but not bold.
    $purple = $PURPLE

    $totalLen = $payload.Length
    $contentEnd = $insertPoint + $totalLen
    $whyLine = '[Why: ' + $why + ']'
    $whyStart = $contentEnd - $whyLine.Length - 1  # subtract trailing `r
    $whyEnd   = $contentEnd - 1                     # exclude trailing `r

    # All lines: purple
    $allRange = $doc.Range($insertPoint, $contentEnd)
    $allRange.Font.Color = $purple

    # Lines (except why line): bold
    $linesRange = $doc.Range($insertPoint, $whyStart)
    $linesRange.Font.Bold = $true

    # Why line: italic, not bold, slightly smaller
    $whyRange = $doc.Range($whyStart, $whyEnd)
    $whyRange.Font.Italic = $true
    $whyRange.Font.Bold = $false
}

$summary = @()
foreach ($task in $tasks) {
    $src = Join-Path $NEW_DIR $task.Source
    $dst = Join-Path $REV_DIR $task.Output
    $isLegacy = $false
    if ($task.ContainsKey('IsLegacyDoc')) { $isLegacy = $task.IsLegacyDoc }

    if (-not (Test-Path $src)) {
        $summary += [PSCustomObject]@{ Source = $task.Source; Result = 'MISSING source file' }
        continue
    }

    Write-Host "Processing $($task.Source) -> $($task.Output)"
    $doc = Open-And-CopyToRevised -src $src -dst $dst -isLegacy $isLegacy

    $injected = 0
    $missed   = 0
    foreach ($ins in $task.Insertions) {
        $alt = if ($ins.ContainsKey('AnchorAlt')) { $ins.AnchorAlt } else { '' }
        $anchorRange = Find-Anchor-Range -doc $doc -anchorText $ins.Anchor -anchorAlt $alt
        if ($anchorRange -eq $null) {
            Write-Host "  -- anchor NOT FOUND: $($ins.Anchor)"
            $missed += 1
            continue
        }
        Inject-At-Anchor -doc $doc -anchorRange $anchorRange -where $ins.Where -lines $ins.Lines -why $ins.Why
        Write-Host "  ++ injected $($ins.Lines.Count) line(s) at anchor: $($ins.Anchor)"
        $injected += 1
    }

    $doc.Save()
    $doc.Close()

    $summary += [PSCustomObject]@{
        Source = $task.Source
        Output = $task.Output
        Injected = $injected
        Missed = $missed
    }
}

$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
[GC]::Collect() | Out-Null
[GC]::WaitForPendingFinalizers() | Out-Null

Write-Host ""
Write-Host "=== Summary ==="
$summary | Format-Table -AutoSize
Write-Host ""
Write-Host "Output: $REV_DIR"
Get-ChildItem $REV_DIR -Filter '*.docx' | Select-Object Name, Length
