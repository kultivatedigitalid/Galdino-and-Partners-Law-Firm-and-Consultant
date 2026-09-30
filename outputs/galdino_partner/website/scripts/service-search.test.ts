import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SERVICES} from '../src/data/services';
import {serviceScore} from '../src/utils/service-search';
const results=(query:string)=>SERVICES.map(s=>({id:s.id,score:serviceScore({id:s.id,title:s.content.id.title,keywords:s.keywords+' '+s.content.id.description},query)})).filter(s=>s.score>0).sort((a,b)=>b.score-a.score);
test('partial permit names match case and punctuation independently',()=>{assert.ok(results('UkL-Up').some(s=>s.id==='ukl-upl'));assert.equal(results('ISO / 9001')[0]?.id,'sertifikasi-iso-9001');assert.equal(results('ISO 9001').length,1)});
test('business intent recommends relevant services even without the permit name',()=>{const ids=results('saya mau bangun gudang').map(s=>s.id);for(const id of ['pbg-imb','slf','kkpr','andalalin'])assert.ok(ids.includes(id),id);assert.ok(results('papan toko').some(s=>s.id==='izin-reklame'));assert.ok(results('wastewater treatment').some(s=>s.id==='pertek-air-limbah'));assert.ok(results('KBLI gudang 52101').some(s=>s.id==='slf'));assert.ok(results('laboratorium').some(s=>s.id==='akreditasi-iso-17025'))});
test('specific titles outrank incidental keyword matches',()=>{assert.equal(results('pajak reklame')[0]?.id,'pajak-reklame');assert.equal(results('ISO 27001')[0]?.id,'sertifikasi-iso-27001')});
test('empty and unknown queries do not manufacture recommendations',()=>{assert.deepEqual(results(''),[]);assert.deepEqual(results('zzznomatch'),[]);assert.deepEqual(results('ISO 99999'),[])});

test('broad licensing queries show permits without broadening specific intent',()=>{for(const q of ['perizinan','izin','jasa perizinan','permit','licensing']){const found=results(q);assert.ok(found.length>20,q);assert.ok(found.some(s=>s.id==='pbg-imb'),q);}assert.equal(results('jasa izin ISO 9001').length,1);assert.deepEqual(results('perizinan zzznomatch'),[])});
