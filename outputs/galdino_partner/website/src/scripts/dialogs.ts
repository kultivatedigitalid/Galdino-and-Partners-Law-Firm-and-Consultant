// Keep keyboard navigation inside an open dialog, including single-button dialogs.
document.querySelectorAll<HTMLDialogElement>('dialog').forEach(dialog=>{
 dialog.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const controls=[...dialog.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')].filter(el=>el.getClientRects().length>0);
  const first=controls[0],last=controls.at(-1);
  if(!first||!last)return;
  if(event.shiftKey&&(document.activeElement===first||!dialog.contains(document.activeElement))){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&(document.activeElement===last||!dialog.contains(document.activeElement))){event.preventDefault();first.focus();}
 });
});
